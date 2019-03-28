function txtAnchorToAlign(anchor) {
    if(anchor === 'middle'){
        return 'center';
    }else if(anchor === 'start'){
        return 'left';
    }else if(anchor === 'end'){
        return 'right';
    }else{
         return anchor;
    }
}
function eleFromStr(string){
    const ele = document.createElement('div');
    ele.innerHTML = string;
    return ele.firstElementChild;
}
function chartTextToHtml(chart) {
    const textDivs = document.createElement('div');
    textDivs.setAttribute('style', 'position: absolute; top: 0')
    chart.containerDiv.appendChild(textDivs);
    chart.containerDiv.querySelectorAll('text:not(.amcharts-zoom-out-label)')
    .forEach(txt => {
        const newTxt = document.createElement('div');
        textDivs.appendChild(newTxt);
        newTxt.style.position = 'absolute';
        if(txt.children.length > 0){
            txt.querySelectorAll('tspan')
            .forEach(span => {
                const newSpan = document.createElement('p');
                newSpan.innerHTML = span.innerHTML;
                newSpan.style.margin = 0;
                newTxt.appendChild(newSpan);
                newSpan.style.height = span.getBoundingClientRect().height + 'px';
            })
        }else{
            newTxt.innerHTML = txt.innerHTML;
        }
        const rect = txt.getBoundingClientRect();
        newTxt.style.whiteSpace = 'nowrap';
        newTxt.style.fontSize = txt.getAttribute('font-size');
        newTxt.style.color = txt.getAttribute('fill');
        newTxt.style.textAlign = txtAnchorToAlign(txt.getAttribute('text-anchor'));
        let newTop, newLeft;
        if(txt.getAttribute('transform').includes('rotate')){
            newTxt.style.transform = "rotate(270deg)";
            newTop = rect.y - (rect.width/4) - chart.containerDiv.getBoundingClientRect().y + 3;
            newLeft = rect.x - chart.containerDiv.getBoundingClientRect().x + 1;
        }else{
            newTop = rect.y - (rect.height/4) - chart.containerDiv.getBoundingClientRect().y + 3;
            newLeft = rect.x - chart.containerDiv.getBoundingClientRect().x + 1;
        }
        newTxt.style.top = newTop + 'px';
        newTxt.style.left = newLeft + 'px';
        txt.style.visibility = 'hidden';
    })
    return textDivs;
}
function svgToCanvas(svg, scale=1){
    const canvas = document.createElement('canvas');
    const rect = svg.getBoundingClientRect();
    canvas.width = rect.width*scale;
    canvas.height = rect.height*scale;
    svg.setAttribute('style', '');
    svg.setAttribute('viewBox', '0 0 ' + rect.width + ' ' + rect.height);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    canvg(canvas, svg.outerHTML);
    return canvas;
}
function downloadCanvas(canvas) {
    const a = document.createElement('a');
    a.setAttribute('href', canvas.toDataURL("image/png", 1.0));
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
}
function loadJS(url){
    return new Promise( r => {
        const script = document.createElement('script');
        script.onload = r
        script.src = url;
        document.body.appendChild(script);
    })
}

function loadAmChartsExportMenu () {
    const translations = {
        'en' : {
            fontSize : 'Text font size',
            fontColor : 'Text color',
            exportButton : 'Export',
            radius : 'Pie size',
            angle : 'Pie rotation',
            maxLabelWidth : 'Max label width',
            labelRadius : 'Label distance',
            chart : 'Chart',
            legend : 'Legend',
            customize : 'Customize',
            horizontalMargin : 'Horizontal Margin',
            legendPosition : 'Position',
            top : 'Top',
            bottom : 'Bottom',
            left : 'Left',
            right : 'Right',
            enable : 'Enabled',
            verticalMargin : 'Vertical Margin'
        },
        'pt-BR' : {
            fontSize : 'Tamanho do texto',
            fontColor : 'Cor do texto',
            exportButton : 'Exportar',
            radius : 'Tamanho do círculo',
            angle : 'Rotação do círculo',
            maxLabelWidth : 'Largura máxima dos rótulos',
            labelRadius : 'Distância dos rótulos',
            chart : 'Gráfico',
            legend : 'Legenda',
            customize : 'Customizar',
            horizontalMargin : 'Margem horizontal',
            legendPosition : 'Posição da legenda',
            top : 'Em cima',
            bottom : 'Embaixo',
            left : 'Esquerda',
            right : 'Direita',
            enable : 'Habilitado',
            verticalMargin : 'Margem vertical'
        }
    }
    let texts = translations[navigator.language];
    if(! texts ){
        texts = translations['en'];
    }
    AmCharts.charts.forEach( (chart,i) => {
        const appendToEle = chart.containerDiv.parentElement.parentElement.parentElement;
        //TODO: Add inputs to change colors
        const button = eleFromStr(
        `<button class="side-menu-button" style="margin-bottom : 1rem; position: absolute;top: 0;right: 0;padding: .3rem;cursor: pointer;border-radius: 50%;border: none;background: transparent;color: inherit;font-size: 2rem;margin-right: .5rem;transition: .2s ease;">
            ☰
        </button>`
        )
        const drawer = eleFromStr(
        `<div class="side-menu-drawer" style="border-left: 1px solid lightgray;position: absolute;width: 300px;height: 100%;top: 0;right: 0;background: inherit; color : inherit;transform: translateX(100%);transform-origin: right;transition: .5s ease;padding: 1.5rem; max-width : 100%; overflow : auto">
            <a class="side-menu-close">&times</a>
            <h3 style="margin-bottom: 1rem;text-align: center;">${texts.customize}</h3>
        </div>`);
        const chartOptions = eleFromStr('<div class="chart-options-div"></div>');
        //--Global AmChart options--
        //Font Size
        const fontSizeInput = eleFromStr(`<input type="range" min="8" max="50" value="${chart.fontSize}">`);
        fontSizeInput.oninput = evt => {
            const newFontSize = Number(fontSizeInput.value)
            chart.fontSize = newFontSize;
            if(chart.graphs && chart.graphs.length > 0){
                chart.graphs.forEach( graph => graph.fontSize = newFontSize)
            }
            if(chart.categoryAxis){
                chart.categoryAxis.fontSize = newFontSize;
            }
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontSize}</label>`);
        chartOptions.insertAdjacentElement('beforeend',fontSizeInput);
        //Font Color
        const fontColorInput = eleFromStr(`<input style="margin-bottom : 1rem" type="color" value="${chart.color}">`);
        let timeout = null;
        fontColorInput.oninput = evt => {
            clearTimeout(timeout);
            timeout = setTimeout( () => {
                chart.color = fontColorInput.value;
                chart.validateNow();
            }, 350)
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontColor}</label>`);
        chartOptions.insertAdjacentElement('beforeend',fontColorInput);
        //--Pie Chart options--
        if(chart.type === 'pie'){
            //Pie Radius
            const chartRadiusInput = eleFromStr(`<input type="range" step="5" min="50" value="${chart.radiusReal || 200}" max="${chart.radiusReal*2 || 350}">`);
            chartRadiusInput.oninput = evt => {
                chart.radius = Number(chartRadiusInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.radius}</label>`);
            chartOptions.insertAdjacentElement('beforeend',chartRadiusInput);
            //Pie Angle
            const chartAngleInput = eleFromStr(`<input type="range" step="10" min="0" value="${chart.startAngle || 90}" max="360">`);
            chartAngleInput.oninput = evt => {
                chart.startAngle = Number(chartAngleInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.angle}</label>`);
            chartOptions.insertAdjacentElement('beforeend',chartAngleInput);
            //Pie Max label width
            const chartLabelWidthInput = eleFromStr(`<input type="range" step="5" min="50" value="${chart.maxLabelWidth || 100}" max="250">`);
            chartLabelWidthInput.oninput = evt => {
                chart.maxLabelWidth = Number(chartLabelWidthInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.maxLabelWidth}</label>`);
            chartOptions.insertAdjacentElement('beforeend',chartLabelWidthInput);
            //Pie label radius
            const chartLabelRadiusInput = eleFromStr(`<input type="range" step="1" min="-100" value="${chart.labelRadius || 20}" max="300">`);
            chartLabelRadiusInput.oninput = evt => {
                chart.labelRadius = Number(chartLabelRadiusInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.labelRadius}</label>`);
            chartOptions.insertAdjacentElement('beforeend',chartLabelRadiusInput);
        }else if(chart.type === 'serial'){
            //Horizontal Margin
            const horizontalMarginInput = eleFromStr(`<input style="margin-bottom : 1rem" value="${chart.marginLeft}" step="10" type="range" min="0" max="500" value="0">`);
            horizontalMarginInput.oninput = evt => {
                chart.autoMargins = false;
                chart.marginRight = Number(horizontalMarginInput.value);
                chart.marginLeft = Number(horizontalMarginInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.horizontalMargin}</label>`);
            chartOptions.insertAdjacentElement('beforeend',horizontalMarginInput);
            //Vertical Margin
            const verticalMarginInput = eleFromStr(`<input style="margin-bottom : 1rem" value="${chart.marginBottom}" step="10" type="range" min="0" max="400" value="0">`);
            verticalMarginInput.oninput = evt => {
                chart.autoMargins = false;
                chart.marginTop = Number(verticalMarginInput.value);
                chart.marginBottom = Number(verticalMarginInput.value);
                chart.validateNow();
            }
            chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.verticalMargin}</label>`);
            chartOptions.insertAdjacentElement('beforeend',verticalMarginInput);
        }
        //--Legend Options--
        if(chart.legend){
            const legendOptions = eleFromStr('<div hidden class="legend-options-div"></div>');
            //Legend enable
            const legendEnableCheck = eleFromStr(`<input style="float: right" id="legend-enable-${i}" checked="true" type="checkbox">`);
            legendEnableCheck.onchange = evt => {
                [...legendEnableCheck.parentElement.children].forEach( sibling => {
                    if(!legendEnableCheck.isSameNode(sibling)){
                        if(legendEnableCheck.checked){
                            sibling.removeAttribute('disabled');
                        }else{
                            sibling.setAttribute('disabled', true);
                        }
                    }
                })
                chart.legend.enabled = legendEnableCheck.checked;
                chart.validateNow();
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label for="legend-enable-${i}" style="display : inline-block">${texts.enable}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendEnableCheck);
            //Legend Font Size
            const legendFontSizeInput = eleFromStr(`<input type="range" min="8" max="50" value="${chart.legend.fontSize || chart.fontSize}">`);
            legendFontSizeInput.oninput = evt => {
                chart.legend.fontSize = Number(legendFontSizeInput.value);
                chart.validateNow();
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontSize}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendFontSizeInput);
            //Legend Font Color
            const legendFontColorInput = eleFromStr(`<input style="margin-bottom : 1rem" type="color" value="${chart.legend.color}">`);
            let timeout = null;
            legendFontColorInput.oninput = evt => {
                clearTimeout(timeout);
                timeout = setTimeout( () => {
                    chart.legend.color = legendFontColorInput.value;
                    chart.validateNow();
                }, 350)
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontColor}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendFontColorInput);
            //Legend Horizontal Margin
            const legendHorizontalMarginInput = eleFromStr(`<input style="margin-bottom : 1rem" "${chart.legend.marginRight}" step="10" type="range" min="0" max="500" value="0">`);
            legendHorizontalMarginInput.oninput = evt => {
                chart.legend.autoMargins = false;
                if(chart.legend.position === 'right'){
                    chart.legend.marginRight = Number(legendHorizontalMarginInput.value);
                    chart.legend.marginLeft = 0;
                }else if(chart.legend.position === 'left'){
                    chart.legend.marginRight = 0;
                    chart.legend.marginLeft = Number(legendHorizontalMarginInput.value);
                }else{
                    chart.legend.marginRight = Number(legendHorizontalMarginInput.value);
                    chart.legend.marginLeft = Number(legendHorizontalMarginInput.value);
                }
                chart.validateNow();
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.horizontalMargin}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendHorizontalMarginInput);
            //Legend Position
            const legendPositionSelect = eleFromStr(
            `<select style="margin-bottom : 1rem">
                <option ${chart.legend.position === 'bottom' ? 'selected' : ''} value="bottom">${texts.bottom}</option>
                <option ${chart.legend.position === 'top' ? 'selected' : ''} value="top">${texts.top}</option>
                <option ${chart.legend.position === 'left' ? 'selected' : ''} value="left">${texts.left}</option>
                <option ${chart.legend.position === 'right' ? 'selected' : ''} value="right">${texts.right}</option>
            `);
            legendPositionSelect.onchange = evt => {
                const pos = legendPositionSelect.value;
                if(pos === 'right'){
                    chart.legend.marginRight = Math.max(chart.legend.marginRight,chart.legend.marginLeft);
                    chart.legend.marginLeft = 0;
                }else if(pos === 'left'){
                    chart.legend.marginLeft = Math.max(chart.legend.marginRight,chart.legend.marginLeft);
                    chart.legend.marginRight = 0;
                }
                chart.legend.position = pos;
                chart.validateNow();
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.legendPosition}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendPositionSelect);
            //Legend Label Max Width
            const legendLabelWidthInput = eleFromStr(`<input type="range" step="5" min="50" value="${chart.legend.labelWidth || 100}" max="250">`);
            legendLabelWidthInput.oninput = evt => {
                chart.legend.labelWidth = legendLabelWidthInput.value;
                chart.validateNow();
            }
            legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.maxLabelWidth}</label>`);
            legendOptions.insertAdjacentElement('beforeend',legendLabelWidthInput);
            //Putting radio buttons to switch modes
            const switchButtons = eleFromStr(
                `<div class="mode-switch-div">
                    <input hidden type="radio" name="switch-radios-${i}" id="chart-radio-${i}" checked="true">
                    <label for="chart-radio-${i}">${texts.chart}</label>
                    <input hidden type="radio" name="switch-radios-${i}" id="legend-radio-${i}">
                    <label for="legend-radio-${i}">${texts.legend}</label>
                </div>`
            )
            const chartRadio = switchButtons.querySelector(`#chart-radio-${i}`);
            const legendRadio = switchButtons.querySelector(`#legend-radio-${i}`);
            chartRadio.onchange = evt => {
                legendOptions.hidden = true;
                chartOptions.hidden = false;
            };
            legendRadio.onchange = evt => {
                legendOptions.hidden = false;
                chartOptions.hidden = true;
            };
            drawer.insertAdjacentElement('beforeend', switchButtons);
            drawer.insertAdjacentElement('beforeend', legendOptions);
        }
        drawer.insertAdjacentElement('beforeend', chartOptions);
        //Activating opacity event;
        drawer.querySelectorAll('input[type="range"]').forEach( input => {
            input.onmousedown = evt => input.parentElement.parentElement.style.opacity = '0.35';
            input.onmouseup = evt => input.parentElement.parentElement.style.opacity = '1';
        })
        //Export Button
        const exportButton = eleFromStr(`<button style="width: 100%;margin-top: 2rem;border: 1px solid lightgray;padding: .5rem;background: white;cursor: pointer;" class="export-btn">${texts.exportButton}</button>`);
        exportButton.onclick = evt => {
            button.style.visibility = 'visible';
            drawer.style.transform = 'translateX(100%)';
            amChartToCanvas(chart, 3.25)
            .then(downloadCanvas)
        }
        drawer.insertAdjacentElement('beforeend',exportButton);
        //Animations
        drawer.querySelector('.side-menu-close').onclick = evt => {
            button.style.visibility = 'visible';
            drawer.style.transform = 'translateX(100%)';
        }
        button.onclick = evt => {
            button.style.visibility = 'hidden';
            drawer.style.transform = 'translateX(0px)';
        }
        const drawerExists = appendToEle.querySelector('.side-menu-drawer');
        const buttonExists = appendToEle.querySelector('.side-menu-button');
        //If already loaded, reload
        if(drawerExists){
            drawerExists.remove();
        }
        if(buttonExists){
            buttonExists.remove();
        }
        appendToEle.appendChild(button);
        appendToEle.appendChild(drawer);
    })

    console.log('Dashboard Charts to Image loaded!')
    
}
function amChartToCanvas(chart, scale) {
    const options = {
        backgroundColor : null,
        scale : scale,
        useCORS : true,
        allowTaint : false,
        onclone : doc => {
            const ele = doc.querySelector('[html2canvas-current-div="true"]');
            ele.querySelectorAll('[class*="amcharts-zoom-out"]').forEach(rmv => rmv.remove());
            ele.querySelectorAll('*').forEach(child => {
                child.style.backgroundColor = 'transparent'
            });
            ele.style.backgroundColor = 'transparent'
            ele.querySelectorAll('[class*="amcharts-scrollbar"]').forEach(scrollbar => scrollbar.remove());
            ele.querySelectorAll('svg').forEach(svg => {
                const parent = svg.parentElement;
                const canvas = svgToCanvas(svg, scale);
                canvas.setAttribute('style', `transform: scale(${1/scale}, ${1/scale});transform-origin: top left`)
                svg.replaceWith(canvas);
                parent.style.overflow = 'visible';
                canvas.style.overflow = 'visible';
            });

        }
    }
    //TODO: Change scope based on wether the user wants labels
    const outerDiv = chart.containerDiv;
    document.querySelectorAll('[html2canvas-current-div="true"]').forEach(ele => ele.removeAttribute('html2canvas-current-div'))
    outerDiv.setAttribute('html2canvas-current-div', 'true');
    const newTxtDivs = chartTextToHtml(chart);
    return html2canvas(outerDiv, options)
    .then(canvas => {
        newTxtDivs.remove();
        chart.containerDiv.querySelectorAll('text').forEach(txt => txt.style.visibility = 'visible');
        const ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        return canvas;
    })
}
loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@master/libs/html2canvas.min.js')
.then( () => loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@master/libs/rgbcolor.min.js'))
.then( () => loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@master/libs/canvg.min.js'))
.then(loadAmChartsExportMenu)

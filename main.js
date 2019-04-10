const palette=function(){var f=Array.prototype,e=function(e,d,c){return f.slice.apply(e,f.slice.call(arguments,1))},d=function(f,c,a,b){if(0==(c|=0))return[];if("function"!=typeof f){var t=d.listSchemes(f,c);if(!t.length)return null;f=t[(a||0)%t.length]}var n=e(arguments,2);return n[0]=c,f.apply(f,n)};d.Scheme=function(f,c){var a={},b=0,t=1e9,n=function(f,c){if(!(f|=0))return[];var r=f;if((f=Math.abs(f))<=b){for(var i=Math.max(f,t);!(i in a);++i);var l=a[i];if(i>f){if(!("shrinking_takes_head"in l?l.shrinking_takes_head:n.shrinking_takes_head))return d.generate(function(f){return l[Math.round(f)]},r,0,l.length-1);l=l.slice(0,f),i=f}return l=l.slice(),r<0&&l.reverse(),l}return n.color_func?d.generate(function(){if(arguments.length<=1)return n.color_func.bind(n);var f=e(arguments);return function(e){return f[0]=e,n.color_func.apply(n,f)}}.apply(n,arguments),r,0,1,n.color_func_cyclic):null};return n.scheme_name=f,n.groups=c?"string"==typeof c?[c]:c:[],n.max=0,n.cbf_max=1e9,n.addPalette=function(f,e){var d=f.length;d&&(a[d]=f,t=Math.min(t,d),b=Math.max(b,d),n.max=Math.max(n.max,d),e||1==d||(n.cbf_max=Math.min(n.cbf_max,d-1)))},n.addPalettes=function(f,e,d){e=e||f.length;for(var c=0;c<e;++c)c in f&&n.addPalette(f[c],!0);n.cbf_max=Math.min(n.cbf_max,d||1)},n.shrinkByTakingHead=function(f,e){void 0!==e?e in a&&(a[e].shrinking_takes_head=!!f):n.shrinking_takes_head=!!f},n.setColorFunction=function(f,e,d){n.color_func=f,n.color_func_cyclic=!!d,n.max=1e9,e||1e9!==n.cbf_max||(n.cbf_max=1)},n.color=function(f,e){return n.color_func?n.color_func.apply(this,arguments):null},n},d.Scheme.fromPalettes=function(f,c,a,b,t){var n=d.Scheme(f,c);return n.addPalettes.apply(n,e(arguments,2)),n},d.Scheme.withColorFunction=function(f,c,a,b,t){var n=d.Scheme(f,c);return n.setColorFunction.apply(n,e(arguments,2)),n};var c={};d.register=function(f){c["n-"+f.scheme_name]=[f],f.groups.forEach(function(e){(c["g-"+e]=c["g-"+e]||[]).push(f)}),(c["g-all"]=c["g-all"]||[]).push(f)},d.listSchemes=function(f,e){e?e<0&&(e=-e):e=2;var d=[];return("string"==typeof f?[f]:f).forEach(function(f){var a="-cbf"===f.substring(f.length-4);a&&(f=f.substring(0,f.length-4));for(var b,t=c["g-"+f]||c["n-"+f]||[],n=0;b=t[n];++n)(a?b.cbf:b.max)>=e&&d.push(b)}),d.sort(function(f,e){return f.scheme_name>=e.scheme_name?f.scheme_name>e.scheme_name?1:0:-1}),d},d.generate=function(f,e,d,c,a){if(Math.abs(e)<1)return[];if(d=void 0===d?0:d,c=void 0===c?1:c,Math.abs(e)<2)return[f(d)];for(var b=Math.abs(e),t=d,n=[],r=(c-d)/(a?b:b-1);--b>=0;t+=r)n.push(f(t));return e<0&&n.reverse(),n};var a=function(f){return f>0?f<1?f:1:0};return d.rgbColor=function(f,e,d){return[f,e,d].map(function(f){return 1==(f=Number(Math.round(255*a(f))).toString(16)).length?"0"+f:f}).join("")},d.linearRgbColor=function(f,e,d){return[f,e,d].map(function(f){return(f=a(f))<=.0031308?f*=12.92:f=1.055*Math.pow(f,1/2.4)-.055,1==(f=Number(Math.round(255*f)).toString(16)).length?"0"+f:f}).join("")},d.hsvColor=function(f,e,c){f*=6;var b=void 0===e?1:a(e),t=void 0===c?1:a(c),n=t*(1-b*Math.abs(f%2-1)),r=t*(1-b);switch(Math.floor(f)%6){case 0:return d.rgbColor(t,n,r);case 1:return d.rgbColor(n,t,r);case 2:return d.rgbColor(r,t,n);case 3:return d.rgbColor(r,n,t);case 4:return d.rgbColor(n,r,t);default:return d.rgbColor(t,r,n)}},d.register(d.Scheme.withColorFunction("rainbow","qualitative",d.hsvColor,!1,!0)),d}();palette.ColorFunction,palette.Palette,palette.PalettesList,palette.SchemeType,function(){var f=palette.Scheme.fromPalettes("mpn65","qualitative",[["ff0029","377eb8","66a61e","984ea3","00d2d5","ff7f00","af8d00","7f80cd","b3e900","c42e60","a65628","f781bf","8dd3c7","bebada","fb8072","80b1d3","fdb462","fccde5","bc80bd","ffed6f","c4eaff","cf8c00","1b9e77","d95f02","e7298a","e6ab02","a6761d","0097ff","00d067","000000","252525","525252","737373","969696","bdbdbd","f43600","4ba93b","5779bb","927acc","97ee3f","bf3947","9f5b00","f48758","8caed6","f2b94f","eff26e","e43872","d9b100","9d7a00","698cff","d9d9d9","00d27e","d06800","009f82","c49200","cbe8ff","fecddf","c27eb6","8cd2ce","c4b8d9","f883b0","a49100","f48800","27d0df","a04a9b"]]);f.shrinkByTakingHead(!0),palette.register(f)}(),function(){var f=palette.rgbColor,e=function(f,e){for(var d=arguments.length-1,c=arguments[d];d>1;)c=c*f+arguments[--d];return c},d=function(f){var d=e(Math.abs(f),1,.278393,.230389,972e-6,.078108);return d*=d,d=1-1/(d*=d),f<0?-d:d};palette.register(palette.Scheme.fromPalettes("tol","qualitative",[["4477aa"],["4477aa","cc6677"],["4477aa","ddcc77","cc6677"],["4477aa","117733","ddcc77","cc6677"],["332288","88ccee","117733","ddcc77","cc6677"],["332288","88ccee","117733","ddcc77","cc6677","aa4499"],["332288","88ccee","44aa99","117733","ddcc77","cc6677","aa4499"],["332288","88ccee","44aa99","117733","999933","ddcc77","cc6677","aa4499"],["332288","88ccee","44aa99","117733","999933","ddcc77","cc6677","882255","aa4499"],["332288","88ccee","44aa99","117733","999933","ddcc77","661100","cc6677","882255","aa4499"],["332288","6699cc","88ccee","44aa99","117733","999933","ddcc77","661100","cc6677","882255","aa4499"],["332288","6699cc","88ccee","44aa99","117733","999933","ddcc77","661100","cc6677","aa4466","882255","aa4499"]],12,12)),palette.tolSequentialColor=function(e){return f(1-.392*(1+d((e-.869)/.255)),1.021-.456*(1+d((e-.527)/.376)),1-.493*(1+d((e-.272)/.309)))},palette.register(palette.Scheme.withColorFunction("tol-sq","sequential",palette.tolSequentialColor,!0)),palette.tolDivergingColor=function(d){var c=e(d,.572,1.524,-1.811)/e(d,1,-.291,.1574);return f(e(d,.235,-2.13,26.92,-65.5,63.5,-22.36),c*c,1/e(d,1.579,-4.03,12.92,-31.4,48.6,-23.36))},palette.register(palette.Scheme.withColorFunction("tol-dv","diverging",palette.tolDivergingColor,!0)),palette.tolRainbowColor=function(d){return f(e(d,.472,-.567,4.05)/e(d,1,8.72,-19.17,14.1),e(d,.108932,-1.22635,27.284,-98.577,163.3,-131.395,40.634),1/e(d,1.97,3.54,-68.5,243,-297,125))},palette.register(palette.Scheme.withColorFunction("tol-rainbow","qualitative",palette.tolRainbowColor,!0))}(),palette.register(palette.Scheme.fromPalettes("sol-base","sequential",[["002b36","073642","586e75","657b83","839496","93a1a1","eee8d5","fdf6e3"]],1,8)),palette.register(palette.Scheme.fromPalettes("sol-accent","qualitative",[["b58900","cb4b16","dc322f","d33682","6c71c4","268bd2","2aa198","859900"]])),function(){var f={YlGn:{type:"sequential",cbf:42,3:["f7fcb9","addd8e","31a354"],4:["ffffcc","c2e699","78c679","238443"],5:["ffffcc","c2e699","78c679","31a354","006837"],6:["ffffcc","d9f0a3","addd8e","78c679","31a354","006837"],7:["ffffcc","d9f0a3","addd8e","78c679","41ab5d","238443","005a32"],8:["ffffe5","f7fcb9","d9f0a3","addd8e","78c679","41ab5d","238443","005a32"],9:["ffffe5","f7fcb9","d9f0a3","addd8e","78c679","41ab5d","238443","006837","004529"]},YlGnBu:{type:"sequential",cbf:42,3:["edf8b1","7fcdbb","2c7fb8"],4:["ffffcc","a1dab4","41b6c4","225ea8"],5:["ffffcc","a1dab4","41b6c4","2c7fb8","253494"],6:["ffffcc","c7e9b4","7fcdbb","41b6c4","2c7fb8","253494"],7:["ffffcc","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","0c2c84"],8:["ffffd9","edf8b1","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","0c2c84"],9:["ffffd9","edf8b1","c7e9b4","7fcdbb","41b6c4","1d91c0","225ea8","253494","081d58"]},GnBu:{type:"sequential",cbf:42,3:["e0f3db","a8ddb5","43a2ca"],4:["f0f9e8","bae4bc","7bccc4","2b8cbe"],5:["f0f9e8","bae4bc","7bccc4","43a2ca","0868ac"],6:["f0f9e8","ccebc5","a8ddb5","7bccc4","43a2ca","0868ac"],7:["f0f9e8","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","08589e"],8:["f7fcf0","e0f3db","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","08589e"],9:["f7fcf0","e0f3db","ccebc5","a8ddb5","7bccc4","4eb3d3","2b8cbe","0868ac","084081"]},BuGn:{type:"sequential",cbf:42,3:["e5f5f9","99d8c9","2ca25f"],4:["edf8fb","b2e2e2","66c2a4","238b45"],5:["edf8fb","b2e2e2","66c2a4","2ca25f","006d2c"],6:["edf8fb","ccece6","99d8c9","66c2a4","2ca25f","006d2c"],7:["edf8fb","ccece6","99d8c9","66c2a4","41ae76","238b45","005824"],8:["f7fcfd","e5f5f9","ccece6","99d8c9","66c2a4","41ae76","238b45","005824"],9:["f7fcfd","e5f5f9","ccece6","99d8c9","66c2a4","41ae76","238b45","006d2c","00441b"]},PuBuGn:{type:"sequential",cbf:42,3:["ece2f0","a6bddb","1c9099"],4:["f6eff7","bdc9e1","67a9cf","02818a"],5:["f6eff7","bdc9e1","67a9cf","1c9099","016c59"],6:["f6eff7","d0d1e6","a6bddb","67a9cf","1c9099","016c59"],7:["f6eff7","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016450"],8:["fff7fb","ece2f0","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016450"],9:["fff7fb","ece2f0","d0d1e6","a6bddb","67a9cf","3690c0","02818a","016c59","014636"]},PuBu:{type:"sequential",cbf:42,3:["ece7f2","a6bddb","2b8cbe"],4:["f1eef6","bdc9e1","74a9cf","0570b0"],5:["f1eef6","bdc9e1","74a9cf","2b8cbe","045a8d"],6:["f1eef6","d0d1e6","a6bddb","74a9cf","2b8cbe","045a8d"],7:["f1eef6","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","034e7b"],8:["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","034e7b"],9:["fff7fb","ece7f2","d0d1e6","a6bddb","74a9cf","3690c0","0570b0","045a8d","023858"]},BuPu:{type:"sequential",cbf:42,3:["e0ecf4","9ebcda","8856a7"],4:["edf8fb","b3cde3","8c96c6","88419d"],5:["edf8fb","b3cde3","8c96c6","8856a7","810f7c"],6:["edf8fb","bfd3e6","9ebcda","8c96c6","8856a7","810f7c"],7:["edf8fb","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","6e016b"],8:["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","6e016b"],9:["f7fcfd","e0ecf4","bfd3e6","9ebcda","8c96c6","8c6bb1","88419d","810f7c","4d004b"]},RdPu:{type:"sequential",cbf:42,3:["fde0dd","fa9fb5","c51b8a"],4:["feebe2","fbb4b9","f768a1","ae017e"],5:["feebe2","fbb4b9","f768a1","c51b8a","7a0177"],6:["feebe2","fcc5c0","fa9fb5","f768a1","c51b8a","7a0177"],7:["feebe2","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177"],8:["fff7f3","fde0dd","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177"],9:["fff7f3","fde0dd","fcc5c0","fa9fb5","f768a1","dd3497","ae017e","7a0177","49006a"]},PuRd:{type:"sequential",cbf:42,3:["e7e1ef","c994c7","dd1c77"],4:["f1eef6","d7b5d8","df65b0","ce1256"],5:["f1eef6","d7b5d8","df65b0","dd1c77","980043"],6:["f1eef6","d4b9da","c994c7","df65b0","dd1c77","980043"],7:["f1eef6","d4b9da","c994c7","df65b0","e7298a","ce1256","91003f"],8:["f7f4f9","e7e1ef","d4b9da","c994c7","df65b0","e7298a","ce1256","91003f"],9:["f7f4f9","e7e1ef","d4b9da","c994c7","df65b0","e7298a","ce1256","980043","67001f"]},OrRd:{type:"sequential",cbf:42,3:["fee8c8","fdbb84","e34a33"],4:["fef0d9","fdcc8a","fc8d59","d7301f"],5:["fef0d9","fdcc8a","fc8d59","e34a33","b30000"],6:["fef0d9","fdd49e","fdbb84","fc8d59","e34a33","b30000"],7:["fef0d9","fdd49e","fdbb84","fc8d59","ef6548","d7301f","990000"],8:["fff7ec","fee8c8","fdd49e","fdbb84","fc8d59","ef6548","d7301f","990000"],9:["fff7ec","fee8c8","fdd49e","fdbb84","fc8d59","ef6548","d7301f","b30000","7f0000"]},YlOrRd:{type:"sequential",cbf:42,3:["ffeda0","feb24c","f03b20"],4:["ffffb2","fecc5c","fd8d3c","e31a1c"],5:["ffffb2","fecc5c","fd8d3c","f03b20","bd0026"],6:["ffffb2","fed976","feb24c","fd8d3c","f03b20","bd0026"],7:["ffffb2","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","b10026"],8:["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","b10026"],9:["ffffcc","ffeda0","fed976","feb24c","fd8d3c","fc4e2a","e31a1c","bd0026","800026"]},YlOrBr:{type:"sequential",cbf:42,3:["fff7bc","fec44f","d95f0e"],4:["ffffd4","fed98e","fe9929","cc4c02"],5:["ffffd4","fed98e","fe9929","d95f0e","993404"],6:["ffffd4","fee391","fec44f","fe9929","d95f0e","993404"],7:["ffffd4","fee391","fec44f","fe9929","ec7014","cc4c02","8c2d04"],8:["ffffe5","fff7bc","fee391","fec44f","fe9929","ec7014","cc4c02","8c2d04"],9:["ffffe5","fff7bc","fee391","fec44f","fe9929","ec7014","cc4c02","993404","662506"]},Purples:{type:"sequential",cbf:42,3:["efedf5","bcbddc","756bb1"],4:["f2f0f7","cbc9e2","9e9ac8","6a51a3"],5:["f2f0f7","cbc9e2","9e9ac8","756bb1","54278f"],6:["f2f0f7","dadaeb","bcbddc","9e9ac8","756bb1","54278f"],7:["f2f0f7","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","4a1486"],8:["fcfbfd","efedf5","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","4a1486"],9:["fcfbfd","efedf5","dadaeb","bcbddc","9e9ac8","807dba","6a51a3","54278f","3f007d"]},Blues:{type:"sequential",cbf:42,3:["deebf7","9ecae1","3182bd"],4:["eff3ff","bdd7e7","6baed6","2171b5"],5:["eff3ff","bdd7e7","6baed6","3182bd","08519c"],6:["eff3ff","c6dbef","9ecae1","6baed6","3182bd","08519c"],7:["eff3ff","c6dbef","9ecae1","6baed6","4292c6","2171b5","084594"],8:["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","084594"],9:["f7fbff","deebf7","c6dbef","9ecae1","6baed6","4292c6","2171b5","08519c","08306b"]},Greens:{type:"sequential",cbf:42,3:["e5f5e0","a1d99b","31a354"],4:["edf8e9","bae4b3","74c476","238b45"],5:["edf8e9","bae4b3","74c476","31a354","006d2c"],6:["edf8e9","c7e9c0","a1d99b","74c476","31a354","006d2c"],7:["edf8e9","c7e9c0","a1d99b","74c476","41ab5d","238b45","005a32"],8:["f7fcf5","e5f5e0","c7e9c0","a1d99b","74c476","41ab5d","238b45","005a32"],9:["f7fcf5","e5f5e0","c7e9c0","a1d99b","74c476","41ab5d","238b45","006d2c","00441b"]},Oranges:{type:"sequential",cbf:42,3:["fee6ce","fdae6b","e6550d"],4:["feedde","fdbe85","fd8d3c","d94701"],5:["feedde","fdbe85","fd8d3c","e6550d","a63603"],6:["feedde","fdd0a2","fdae6b","fd8d3c","e6550d","a63603"],7:["feedde","fdd0a2","fdae6b","fd8d3c","f16913","d94801","8c2d04"],8:["fff5eb","fee6ce","fdd0a2","fdae6b","fd8d3c","f16913","d94801","8c2d04"],9:["fff5eb","fee6ce","fdd0a2","fdae6b","fd8d3c","f16913","d94801","a63603","7f2704"]},Reds:{type:"sequential",cbf:42,3:["fee0d2","fc9272","de2d26"],4:["fee5d9","fcae91","fb6a4a","cb181d"],5:["fee5d9","fcae91","fb6a4a","de2d26","a50f15"],6:["fee5d9","fcbba1","fc9272","fb6a4a","de2d26","a50f15"],7:["fee5d9","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","99000d"],8:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","99000d"],9:["fff5f0","fee0d2","fcbba1","fc9272","fb6a4a","ef3b2c","cb181d","a50f15","67000d"]},Greys:{type:"sequential",cbf:42,3:["f0f0f0","bdbdbd","636363"],4:["f7f7f7","cccccc","969696","525252"],5:["f7f7f7","cccccc","969696","636363","252525"],6:["f7f7f7","d9d9d9","bdbdbd","969696","636363","252525"],7:["f7f7f7","d9d9d9","bdbdbd","969696","737373","525252","252525"],8:["ffffff","f0f0f0","d9d9d9","bdbdbd","969696","737373","525252","252525"],9:["ffffff","f0f0f0","d9d9d9","bdbdbd","969696","737373","525252","252525","000000"]},PuOr:{type:"diverging",cbf:42,3:["f1a340","f7f7f7","998ec3"],4:["e66101","fdb863","b2abd2","5e3c99"],5:["e66101","fdb863","f7f7f7","b2abd2","5e3c99"],6:["b35806","f1a340","fee0b6","d8daeb","998ec3","542788"],7:["b35806","f1a340","fee0b6","f7f7f7","d8daeb","998ec3","542788"],8:["b35806","e08214","fdb863","fee0b6","d8daeb","b2abd2","8073ac","542788"],9:["b35806","e08214","fdb863","fee0b6","f7f7f7","d8daeb","b2abd2","8073ac","542788"],10:["7f3b08","b35806","e08214","fdb863","fee0b6","d8daeb","b2abd2","8073ac","542788","2d004b"],11:["7f3b08","b35806","e08214","fdb863","fee0b6","f7f7f7","d8daeb","b2abd2","8073ac","542788","2d004b"]},BrBG:{type:"diverging",cbf:42,3:["d8b365","f5f5f5","5ab4ac"],4:["a6611a","dfc27d","80cdc1","018571"],5:["a6611a","dfc27d","f5f5f5","80cdc1","018571"],6:["8c510a","d8b365","f6e8c3","c7eae5","5ab4ac","01665e"],7:["8c510a","d8b365","f6e8c3","f5f5f5","c7eae5","5ab4ac","01665e"],8:["8c510a","bf812d","dfc27d","f6e8c3","c7eae5","80cdc1","35978f","01665e"],9:["8c510a","bf812d","dfc27d","f6e8c3","f5f5f5","c7eae5","80cdc1","35978f","01665e"],10:["543005","8c510a","bf812d","dfc27d","f6e8c3","c7eae5","80cdc1","35978f","01665e","003c30"],11:["543005","8c510a","bf812d","dfc27d","f6e8c3","f5f5f5","c7eae5","80cdc1","35978f","01665e","003c30"]},PRGn:{type:"diverging",cbf:42,3:["af8dc3","f7f7f7","7fbf7b"],4:["7b3294","c2a5cf","a6dba0","008837"],5:["7b3294","c2a5cf","f7f7f7","a6dba0","008837"],6:["762a83","af8dc3","e7d4e8","d9f0d3","7fbf7b","1b7837"],7:["762a83","af8dc3","e7d4e8","f7f7f7","d9f0d3","7fbf7b","1b7837"],8:["762a83","9970ab","c2a5cf","e7d4e8","d9f0d3","a6dba0","5aae61","1b7837"],9:["762a83","9970ab","c2a5cf","e7d4e8","f7f7f7","d9f0d3","a6dba0","5aae61","1b7837"],10:["40004b","762a83","9970ab","c2a5cf","e7d4e8","d9f0d3","a6dba0","5aae61","1b7837","00441b"],11:["40004b","762a83","9970ab","c2a5cf","e7d4e8","f7f7f7","d9f0d3","a6dba0","5aae61","1b7837","00441b"]},PiYG:{type:"diverging",cbf:42,3:["e9a3c9","f7f7f7","a1d76a"],4:["d01c8b","f1b6da","b8e186","4dac26"],5:["d01c8b","f1b6da","f7f7f7","b8e186","4dac26"],6:["c51b7d","e9a3c9","fde0ef","e6f5d0","a1d76a","4d9221"],7:["c51b7d","e9a3c9","fde0ef","f7f7f7","e6f5d0","a1d76a","4d9221"],8:["c51b7d","de77ae","f1b6da","fde0ef","e6f5d0","b8e186","7fbc41","4d9221"],9:["c51b7d","de77ae","f1b6da","fde0ef","f7f7f7","e6f5d0","b8e186","7fbc41","4d9221"],10:["8e0152","c51b7d","de77ae","f1b6da","fde0ef","e6f5d0","b8e186","7fbc41","4d9221","276419"],11:["8e0152","c51b7d","de77ae","f1b6da","fde0ef","f7f7f7","e6f5d0","b8e186","7fbc41","4d9221","276419"]},RdBu:{type:"diverging",cbf:42,3:["ef8a62","f7f7f7","67a9cf"],4:["ca0020","f4a582","92c5de","0571b0"],5:["ca0020","f4a582","f7f7f7","92c5de","0571b0"],6:["b2182b","ef8a62","fddbc7","d1e5f0","67a9cf","2166ac"],7:["b2182b","ef8a62","fddbc7","f7f7f7","d1e5f0","67a9cf","2166ac"],8:["b2182b","d6604d","f4a582","fddbc7","d1e5f0","92c5de","4393c3","2166ac"],9:["b2182b","d6604d","f4a582","fddbc7","f7f7f7","d1e5f0","92c5de","4393c3","2166ac"],10:["67001f","b2182b","d6604d","f4a582","fddbc7","d1e5f0","92c5de","4393c3","2166ac","053061"],11:["67001f","b2182b","d6604d","f4a582","fddbc7","f7f7f7","d1e5f0","92c5de","4393c3","2166ac","053061"]},RdGy:{type:"diverging",cbf:42,3:["ef8a62","ffffff","999999"],4:["ca0020","f4a582","bababa","404040"],5:["ca0020","f4a582","ffffff","bababa","404040"],6:["b2182b","ef8a62","fddbc7","e0e0e0","999999","4d4d4d"],7:["b2182b","ef8a62","fddbc7","ffffff","e0e0e0","999999","4d4d4d"],8:["b2182b","d6604d","f4a582","fddbc7","e0e0e0","bababa","878787","4d4d4d"],9:["b2182b","d6604d","f4a582","fddbc7","ffffff","e0e0e0","bababa","878787","4d4d4d"],10:["67001f","b2182b","d6604d","f4a582","fddbc7","e0e0e0","bababa","878787","4d4d4d","1a1a1a"],11:["67001f","b2182b","d6604d","f4a582","fddbc7","ffffff","e0e0e0","bababa","878787","4d4d4d","1a1a1a"]},RdYlBu:{type:"diverging",cbf:42,3:["fc8d59","ffffbf","91bfdb"],4:["d7191c","fdae61","abd9e9","2c7bb6"],5:["d7191c","fdae61","ffffbf","abd9e9","2c7bb6"],6:["d73027","fc8d59","fee090","e0f3f8","91bfdb","4575b4"],7:["d73027","fc8d59","fee090","ffffbf","e0f3f8","91bfdb","4575b4"],8:["d73027","f46d43","fdae61","fee090","e0f3f8","abd9e9","74add1","4575b4"],9:["d73027","f46d43","fdae61","fee090","ffffbf","e0f3f8","abd9e9","74add1","4575b4"],10:["a50026","d73027","f46d43","fdae61","fee090","e0f3f8","abd9e9","74add1","4575b4","313695"],11:["a50026","d73027","f46d43","fdae61","fee090","ffffbf","e0f3f8","abd9e9","74add1","4575b4","313695"]},Spectral:{type:"diverging",cbf:0,3:["fc8d59","ffffbf","99d594"],4:["d7191c","fdae61","abdda4","2b83ba"],5:["d7191c","fdae61","ffffbf","abdda4","2b83ba"],6:["d53e4f","fc8d59","fee08b","e6f598","99d594","3288bd"],7:["d53e4f","fc8d59","fee08b","ffffbf","e6f598","99d594","3288bd"],8:["d53e4f","f46d43","fdae61","fee08b","e6f598","abdda4","66c2a5","3288bd"],9:["d53e4f","f46d43","fdae61","fee08b","ffffbf","e6f598","abdda4","66c2a5","3288bd"],10:["9e0142","d53e4f","f46d43","fdae61","fee08b","e6f598","abdda4","66c2a5","3288bd","5e4fa2"],11:["9e0142","d53e4f","f46d43","fdae61","fee08b","ffffbf","e6f598","abdda4","66c2a5","3288bd","5e4fa2"]},RdYlGn:{type:"diverging",cbf:0,3:["fc8d59","ffffbf","91cf60"],4:["d7191c","fdae61","a6d96a","1a9641"],5:["d7191c","fdae61","ffffbf","a6d96a","1a9641"],6:["d73027","fc8d59","fee08b","d9ef8b","91cf60","1a9850"],7:["d73027","fc8d59","fee08b","ffffbf","d9ef8b","91cf60","1a9850"],8:["d73027","f46d43","fdae61","fee08b","d9ef8b","a6d96a","66bd63","1a9850"],9:["d73027","f46d43","fdae61","fee08b","ffffbf","d9ef8b","a6d96a","66bd63","1a9850"],10:["a50026","d73027","f46d43","fdae61","fee08b","d9ef8b","a6d96a","66bd63","1a9850","006837"],11:["a50026","d73027","f46d43","fdae61","fee08b","ffffbf","d9ef8b","a6d96a","66bd63","1a9850","006837"]},Accent:{type:"qualitative",cbf:0,3:["7fc97f","beaed4","fdc086"],4:["7fc97f","beaed4","fdc086","ffff99"],5:["7fc97f","beaed4","fdc086","ffff99","386cb0"],6:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f"],7:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f","bf5b17"],8:["7fc97f","beaed4","fdc086","ffff99","386cb0","f0027f","bf5b17","666666"]},Dark2:{type:"qualitative",cbf:3,3:["1b9e77","d95f02","7570b3"],4:["1b9e77","d95f02","7570b3","e7298a"],5:["1b9e77","d95f02","7570b3","e7298a","66a61e"],6:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02"],7:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02","a6761d"],8:["1b9e77","d95f02","7570b3","e7298a","66a61e","e6ab02","a6761d","666666"]},Paired:{type:"qualitative",cbf:4,3:["a6cee3","1f78b4","b2df8a"],4:["a6cee3","1f78b4","b2df8a","33a02c"],5:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99"],6:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c"],7:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f"],8:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00"],9:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6"],10:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a"],11:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a","ffff99"],12:["a6cee3","1f78b4","b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f00","cab2d6","6a3d9a","ffff99","b15928"]},Pastel1:{type:"qualitative",cbf:0,3:["fbb4ae","b3cde3","ccebc5"],4:["fbb4ae","b3cde3","ccebc5","decbe4"],5:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6"],6:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc"],7:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd"],8:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd","fddaec"],9:["fbb4ae","b3cde3","ccebc5","decbe4","fed9a6","ffffcc","e5d8bd","fddaec","f2f2f2"]},Pastel2:{type:"qualitative",cbf:0,3:["b3e2cd","fdcdac","cbd5e8"],4:["b3e2cd","fdcdac","cbd5e8","f4cae4"],5:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9"],6:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae"],7:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae","f1e2cc"],8:["b3e2cd","fdcdac","cbd5e8","f4cae4","e6f5c9","fff2ae","f1e2cc","cccccc"]},Set1:{type:"qualitative",cbf:0,3:["e41a1c","377eb8","4daf4a"],4:["e41a1c","377eb8","4daf4a","984ea3"],5:["e41a1c","377eb8","4daf4a","984ea3","ff7f00"],6:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33"],7:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628"],8:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628","f781bf"],9:["e41a1c","377eb8","4daf4a","984ea3","ff7f00","ffff33","a65628","f781bf","999999"]},Set2:{type:"qualitative",cbf:3,3:["66c2a5","fc8d62","8da0cb"],4:["66c2a5","fc8d62","8da0cb","e78ac3"],5:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854"],6:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f"],7:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f","e5c494"],8:["66c2a5","fc8d62","8da0cb","e78ac3","a6d854","ffd92f","e5c494","b3b3b3"]},Set3:{type:"qualitative",cbf:0,3:["8dd3c7","ffffb3","bebada"],4:["8dd3c7","ffffb3","bebada","fb8072"],5:["8dd3c7","ffffb3","bebada","fb8072","80b1d3"],6:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462"],7:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69"],8:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5"],9:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9"],10:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd"],11:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd","ccebc5"],12:["8dd3c7","ffffb3","bebada","fb8072","80b1d3","fdb462","b3de69","fccde5","d9d9d9","bc80bd","ccebc5","ffed6f"]}};for(var e in f){var d=f[e];d=palette.Scheme.fromPalettes("cb-"+e,[d.type,"cb-"+d.type],d,12,d.cbf),palette.register(d)}}();
const pSBC=(r,e,t,l)=>{let n,g,i,a,s,b,p,u=parseInt,o=Math.round,c="string"==typeof t;return"number"!=typeof r||r<-1||r>1||"string"!=typeof e||"r"!=e[0]&&"#"!=e[0]||t&&!c?null:(this.pSBCr||(this.pSBCr=(r=>{let e=r.length,t={};if(e>9){if([n,g,i,c]=r=r.split(","),(e=r.length)<3||e>4)return null;t.r=u("a"==n[3]?n.slice(5):n.slice(4)),t.g=u(g),t.b=u(i),t.a=c?parseFloat(c):-1}else{if(8==e||6==e||e<4)return null;e<6&&(r="#"+r[1]+r[1]+r[2]+r[2]+r[3]+r[3]+(e>4?r[4]+r[4]:"")),r=u(r.slice(1),16),9==e||5==e?(t.r=r>>24&255,t.g=r>>16&255,t.b=r>>8&255,t.a=o((255&r)/.255)/1e3):(t.r=r>>16,t.g=r>>8&255,t.b=255&r,t.a=-1)}return t})),p=e.length>9,p=c?t.length>9||"c"==t&&!p:p,s=pSBCr(e),a=r<0,b=t&&"c"!=t?pSBCr(t):a?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},a=1-(r=a?-1*r:r),s&&b?(l?(n=o(a*s.r+r*b.r),g=o(a*s.g+r*b.g),i=o(a*s.b+r*b.b)):(n=o((a*s.r**2+r*b.r**2)**.5),g=o((a*s.g**2+r*b.g**2)**.5),i=o((a*s.b**2+r*b.b**2)**.5)),c=s.a,b=b.a,c=(s=c>=0||b>=0)?c<0?b:b<0?c:c*a+b*r:0,p?"rgb"+(s?"a(":"(")+n+","+g+","+i+(s?","+o(1e3*c)/1e3:"")+")":"#"+(4294967296+16777216*n+65536*g+256*i+(s?o(255*c):0)).toString(16).slice(1,s?void 0:-2)):null)};
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
function parseColor(color) {
    var arr=[]; color.replace(/[\d+\.]+/g, function(v) { arr.push(parseFloat(v)); });
    return {
        hex: "#" + arr.slice(0, 3).map(toHex).join(""),
        opacity: arr.length == 4 ? arr[3] : 1
    };
}
function toHex(int) {
    var hex = int.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function renderColorOptions(chart, texts, colorsDiv) {
    //Pie and Simple Serial Charts
    if(chart.type === 'pie' || (chart.type === 'serial' && chart.dataProvider[0]._fillColor_)){
        //Manual Colors
        const colorsManual = eleFromStr('<div class="mini-colors"></div>');
        const colorField = chart.colorField || '_fillColor_';
        chart.dataProvider.forEach(data => {
            const chartColorInput = eleFromStr(`<input style="cursor: pointer" type="color" value="${data[colorField]}">`);
            let timeout;
            chartColorInput.oninput = evt => {
                clearTimeout(timeout);
                timeout = setTimeout( () => {
                    data[colorField] = chartColorInput.value;
                    if(chart.type === 'serial'){
                        data['_lineColor_'] = chartColorInput.value;
                    }
                    chart.validateData();
                }, 350)
            }
            colorsManual.appendChild(chartColorInput);
        })
        //Palletes
        const paletteSelect = eleFromStr(
            `<div style="display: flex; margin-bottom: 1rem; align-items: center; justify-content: space-between">
                <select style="flex-grow: 1">
                    <option hidden disabled selected>${texts.paletteSelect}...</option>
                    ${getPalettes(chart.dataProvider.length).map(p => `<option value="${p.colors.join()}">${p.name}</option>`)}
                </select>
            </div>`
        )
        paletteSelect.querySelector('select').onchange = evt => {
            const colors = evt.target.value.split(',');
            updateChartColors(chart, colors);
            colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                cInput.value = chart.dataProvider[i][colorField];
            })
        }  
        const colorsTitle = eleFromStr(
            `<h4>
                ${texts.colors}
                <button style="margin-left: 1rem; border: none; background: none;font-size: 1.5rem; cursor: pointer; float : right">
                    🔀
                </button>
            </h4>`
        )
        colorsTitle.querySelector('button').onclick = evt => {
            randomizeChartColors(chart);
            colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                cInput.value = chart.dataProvider[i][colorField];
            })
        }
        const gradientColors = eleFromStr(
            `<div>
                <h6>${texts.gradient}</h6>
                <div style="display:flex;flex-direction:row;flex-wrap : wrap;">
                <div style="display:flex;flex-direction:row;flex-wrap : nowrap;/* margin-right: 1rem; */flex-grow: 1;">
                    <input value="#ffffff" id="from" type="color" style="width: 2rem;height: 2rem;">
                    <span  style="flex-grow: 1;text-align: center;font-size: 2rem;margin-top: -0.5rem;">
                    ⇒
                    </span>
                    <input id="to" value="#000000" type="color" style="width: 2rem;height: 2rem;">
                </div>
                <input id="step" min="0" value="0.1" max="1" step="0.05" type="range" style="width: auto;flex-grow: 1;width: 50%;margin-right: 0.5rem;margin-left: 0.5rem;">
                </div>
            </div>`
        )
        const from = gradientColors.querySelector('#from');
        const to = gradientColors.querySelector('#to');
        const step = gradientColors.querySelector('#step');

        [from,to,step].forEach(input => {
            input.oninput = evt => {
                let colorAmount = chart.dataProvider.length;
                colors = chart.dataProvider.map( (d,i) => {
                    const stepValue = (step.value/colorAmount)*(i+1);
                    const newColor = pSBC(stepValue,from.value,to.value,true);
                    return newColor;
                });
                updateChartColors(chart, colors);
                colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                    cInput.value = chart.dataProvider[i][colorField];
                })
            }
        })
        colorsDiv.appendChild(colorsTitle);
        colorsDiv.appendChild(colorsManual);
        colorsDiv.appendChild(paletteSelect);
        colorsDiv.appendChild(gradientColors);
    //Complex Serial Charts
    //TODO: This is gambeeeeeee
    }else if(chart.type === 'serial'){
        if(chart.dataProvider && chart.dataProvider.length > 0){
            //Manual Colors
            const colorsManual = eleFromStr('<div class="mini-colors"></div>');
            chart.graphs.forEach(graph => {
                const chartColorInput = eleFromStr(`<input style="cursor: pointer" type="color" value="${graph.fillColors || graph.fillColorsR}">`);
                let timeout;
                chartColorInput.oninput = evt => {
                    clearTimeout(timeout);
                    timeout = setTimeout( () => {
                        graph.fillColors = chartColorInput.value;
                        graph.bulletColor = chartColorInput.value;
                        graph.lineColor = chartColorInput.value;
                        chart.validateData();
                    }, 350)
                }
                colorsManual.appendChild(chartColorInput);
            })
            //Palletes
            const paletteSelect = eleFromStr(
                `<div style="display: flex; margin-bottom: 1rem; align-items: center; justify-content: space-between">
                    <select style="flex-grow: 1">
                        <option hidden disabled selected>${texts.paletteSelect}...</option>
                        ${getPalettes(chart.graphs.length).map(p => `<option value="${p.colors.join()}">${p.name}</option>`)}
                    </select>
                </div>`
            )
            paletteSelect.querySelector('select').onchange = evt => {
                const colors = evt.target.value.split(',');
                updateChartColors(chart, colors);
                colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                    cInput.value = chart.graphs[i].fillColors || chart.graphs[i].fillColorsR;
                })
            }  
            const colorsTitle = eleFromStr(
                `<h4>
                    ${texts.colors}
                    <button style="margin-left: 1rem; border: none; background: none;font-size: 1.5rem; cursor: pointer; float : right">
                        🔀
                    </button>
                </h4>`
            )
            colorsTitle.querySelector('button').onclick = evt => {
                randomizeChartColors(chart);
                colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                    cInput.value = chart.graphs[i].fillColors || chart.graphs[i].fillColorsR;
                })
            }
            //Gradient Option
            const gradientColors = eleFromStr(
                `<div>
                    <h6>${texts.gradient}</h6>
                    <div style="display:flex;flex-direction:row;flex-wrap : wrap;">
                    <div style="display:flex;flex-direction:row;flex-wrap : nowrap;/* margin-right: 1rem; */flex-grow: 1;">
                        <input value="#ffffff" id="from" type="color" style="width: 2rem;height: 2rem;">
                        <span  style="flex-grow: 1;text-align: center;font-size: 2rem;margin-top: -0.5rem;">
                        ⇒
                        </span>
                        <input id="to" value="#000000" type="color" style="width: 2rem;height: 2rem;">
                    </div>
                    <input id="step" min="0" value="0.1" max="1" step="0.05" type="range" style="width: auto;flex-grow: 1;width: 50%;margin-right: 0.5rem;margin-left: 0.5rem;">
                    </div>
                </div>`
            )
            const from = gradientColors.querySelector('#from');
            const to = gradientColors.querySelector('#to');
            const step = gradientColors.querySelector('#step');
    
            [from,to,step].forEach(input => {
                input.oninput = evt => {
                    let colorAmount = chart.graphs.length;
                    colors = chart.graphs.map( (g,i) => {
                        const stepValue = (step.value/colorAmount)*(i+1);
                        const newColor = pSBC(stepValue,from.value,to.value,true);
                        return newColor;
                    });
                    updateChartColors(chart, colors);
                    colorsManual.querySelectorAll('input[type="color"]').forEach( (cInput,i) => {
                        cInput.value = chart.graphs[i].fillColors || chart.graphs[i].fillColorsR;
                    })
                }
            })
            colorsDiv.appendChild(colorsTitle);
            colorsDiv.appendChild(colorsManual);
            colorsDiv.appendChild(paletteSelect);
            colorsDiv.appendChild(gradientColors);
        }
    }
}
function updateChartColors(chart, colors){
    if(chart.type === 'pie' || (chart.type === 'serial' && chart.dataProvider[0]._fillColor_)){
        const colorField = chart.colorField || '_fillColor_';
        chart.dataProvider.forEach( (datumP,i) => {
            datumP[colorField] = colors[i];
            if(chart.type === 'serial'){
                datumP['_lineColor_'] = colors[i];
            }
        });
    }else if(chart.type === 'serial'){
        chart.graphs.forEach( (graph, i) => {
            graph.fillColors = colors[i];
            graph.bulletColor = colors[i];
            graph.lineColor = colors[i];
        })
    }
    chart.validateData();
}
function getChartColorList(chart){
    if(chart.type === 'pie'){
        return chart.dataProvider.map(data => data[chart.colorField]);
    }else if(chart.type === 'serial'){
        if(!chart.dataProvider[0]._fillColor_){
            return chart.graphs.map( graph => graph.fillColors || graph.fillColorsR);
        }
        return chart.dataProvider.map( data => data['_fillColor_']);
    }
}
function randomizeChartColors (chart) {
    const colors = getChartColorList(chart)
    updateChartColors(chart, shuffleArray(colors));
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function getPalettes(length){
    const options = [
        {name : 'Palette 1', parameter : 'mpn65'},
        {name : 'Palette 2', parameter : 'tol'},
        {name : 'Palette 3', parameter : 'tol-dv'},
        {name : 'Palette 4', parameter : 'tol-sq'},
        {name : 'Palette 5', parameter : 'tol-rainbow'},
        {name : 'Palette 6', parameter : 'cb-BrBG'},
        {name : 'Palette 7', parameter : 'cb-PRGn'},
        {name : 'Palette 8', parameter : 'cb-PiYG'},
        {name : 'Palette 9', parameter : 'cb-PuOr'},
        {name : 'Palette 10', parameter : 'cb-RdBu'},
        {name : 'Palette 11', parameter : 'cb-RdGy'},
        {name : 'Palette 12', parameter : 'cb-RdYlBu'},
        {name : 'Palette 13', parameter : 'cb-RdYlGn'},
        {name : 'Palette 14', parameter : 'cb-Spectral'},
        {name : 'Palette 15', parameter : 'cb-BrBG'},
    ]
    const colorPalettes = []
    options.forEach(option => {
        const colors = palette(option.parameter, length);
        if(colors){
            colorPalettes.push({name : option.name, colors : colors.map(c => `#${c}`)});
        }
    })
    return colorPalettes;
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
        newTxt.style.fontFamily = txt.getAttribute('font-family');
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
    let count = 0;
    AmCharts.addInitHandler(chart => {
        handleExportMenu(chart, count);
        count ++;
    }, ['pie', 'serial']);
    AmCharts.charts.forEach( chart => {
        handleExportMenu(chart, count)
        count ++;
    })
    console.log('Dashboard Charts Export loaded!');
    
}
function handleExportMenu(chart, i){
    if(chart.chartRendered){
        initAmChartExportMenu(chart, i);
    }else{
        function listener(){
            initAmChartExportMenu(chart, i);
            chart.removeListener(chart, 'rendered', listener);
        }
        chart.addListener('rendered', listener);
    }
}
function initAmChartExportMenu(chart, i){
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
            verticalMargin : 'Vertical Margin',
            includeTitle : 'Include title',
            colors: 'Colors',
            manual: 'Manual',
            gradient: 'Gradient',
            baseColor: 'Base color',
            gradientSize: 'Gradient size',
            paletteSelect: 'Predefined palettes',
            default: 'Default',
            fontFamily: 'Font'

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
            verticalMargin : 'Margem vertical',
            includeTitle : 'Incluir título',
            colors : 'Cores',
            manual: 'Manual',
            gradient: 'Gradiente',
            baseColor: 'Cor base',
            gradientSize: 'Tamanho do gradiente',
            paletteSelect: 'Paletas pré definidas',
            default: 'Padrão',
            fontFamily: 'Fonte'
        }
    }
    let texts = translations[navigator.language];
    if(! texts ){
        texts = translations['en'];
    }
    const appendToEle = chart.containerDiv.parentElement.parentElement.parentElement;
    //TODO: Add inputs to change colors
    const button = eleFromStr(
    `<button class="side-menu-button" style="margin-bottom : 1rem;position: absolute;top: 0;right: 0;padding: .3rem;cursor: pointer;border-radius: 50%;border: none;background: transparent;color: inherit;font-size: 2rem;margin-right: .5rem;transition: .2s ease;">
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
    const fontSizeInput = eleFromStr(`<input type="range" min="5" max="80" value="${chart.fontSize}">`);
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
    chartOptions.appendChild(fontSizeInput);
    //Font Color
    let chartColor = chart.color;
    if(!chartColor || chartColor === 'inherit'){
        chartColor = parseColor(getComputedStyle(chart.div).color).hex;
    }
    const fontColorInput = eleFromStr(`<input style="margin-bottom : 1rem" type="color" value="${chartColor}">`);
    let timeout = null;
    fontColorInput.oninput = evt => {
        clearTimeout(timeout);
        timeout = setTimeout( () => {
            chart.color = fontColorInput.value;
            chart.validateNow();
        }, 350)
    }
    chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontColor}</label>`);
    chartOptions.appendChild(fontColorInput);
    //Font Family
    const fontFamilySelect = eleFromStr(
    `<select style="margin-bottom : 1rem; width : 100%">
        <option style="font-family: inherit" value="inherit">${texts.default}</option>
        <option style="font-family: Calibri" value="Calibri">Calibri</option>
        <option style="font-family: Arial" value="Arial">Arial</option>
    </select>`);
    fontFamilySelect.onchange = evt => {
        chart.fontFamily = fontFamilySelect.value;
        chart.validateNow();
    }
    chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontFamily}</label>`);
    chartOptions.appendChild(fontFamilySelect);
    //Color options
    const colorsDiv = eleFromStr('<div></div>');
    renderColorOptions(chart, texts, colorsDiv);
    chartOptions.appendChild(colorsDiv);
    //Data update listener for updating color
    let lastDataProviderLength = chart.dataProvider.length;
    let timeoutDataUpdated = null;
    chart.addListener('dataUpdated', () => {
        clearTimeout(timeoutDataUpdated);
        timeoutDataUpdated = setTimeout( () => {
            if(lastDataProviderLength != chart.dataProvider.length){
                colorsDiv.innerHTML = '';
                renderColorOptions(chart, texts, colorsDiv);
                lastDataProviderLength = chart.dataProvider.length;
            }
        }, 500)
    })
    //--Pie Chart options--
    if(chart.type === 'pie'){
        //Pie Radius
        const chartRadiusInput = eleFromStr(`<input type="range" step="5" min="0" value="${chart.radiusReal || 200}" max="${screen.width/2}">`);
        chartRadiusInput.oninput = evt => {
            chart.radius = Number(chartRadiusInput.value);
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.radius}</label>`);
        chartOptions.appendChild(chartRadiusInput);
        //Pie Angle
        const chartAngleInput = eleFromStr(`<input type="range" step="10" min="0" value="${chart.startAngle || 90}" max="360">`);
        chartAngleInput.oninput = evt => {
            chart.startAngle = Number(chartAngleInput.value);
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.angle}</label>`);
        chartOptions.appendChild(chartAngleInput);
        //Pie Max label width
        const chartLabelWidthInput = eleFromStr(`<input type="range" step="5" min="50" value="${chart.maxLabelWidth || 100}" max="350">`);
        chartLabelWidthInput.oninput = evt => {
            chart.maxLabelWidth = Number(chartLabelWidthInput.value);
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.maxLabelWidth}</label>`);
        chartOptions.appendChild(chartLabelWidthInput);
        //Pie label radius
        const chartLabelRadiusInput = eleFromStr(`<input type="range" step="5" min="-150" value="${chart.labelRadius || 20}" max="500">`);
        chartLabelRadiusInput.oninput = evt => {
            chart.labelRadius = Number(chartLabelRadiusInput.value);
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.labelRadius}</label>`);
        chartOptions.appendChild(chartLabelRadiusInput);
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
        chartOptions.appendChild(horizontalMarginInput);
        //Vertical Margin
        const verticalMarginInput = eleFromStr(`<input style="margin-bottom : 1rem" value="${chart.marginBottom}" step="10" type="range" min="0" max="500" value="0">`);
        verticalMarginInput.oninput = evt => {
            chart.autoMargins = false;
            chart.marginTop = Number(verticalMarginInput.value);
            chart.marginBottom = Number(verticalMarginInput.value);
            chart.validateNow();
        }
        chartOptions.insertAdjacentHTML('beforeend',`<label>${texts.verticalMargin}</label>`);
        chartOptions.appendChild(verticalMarginInput);
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
        legendOptions.appendChild(legendEnableCheck);
        //Legend Font Size
        const legendFontSizeInput = eleFromStr(`<input type="range" min="8" max="50" value="${chart.legend.fontSize || chart.fontSize}">`);
        legendFontSizeInput.oninput = evt => {
            chart.legend.fontSize = Number(legendFontSizeInput.value);
            chart.validateNow();
        }
        legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontSize}</label>`);
        legendOptions.appendChild(legendFontSizeInput);
        //Legend Font Color
        let chartColorLeg = chart.color;
        if(!chartColorLeg || chartColorLeg === 'inherit'){
            chartColorLeg = parseColor(getComputedStyle(chart.legendDiv).color).hex;
        }
        const legendFontColorInput = eleFromStr(`<input style="margin-bottom : 1rem" type="color" value="${chartColorLeg}">`);
        let timeout = null;
        legendFontColorInput.oninput = evt => {
            clearTimeout(timeout);
            timeout = setTimeout( () => {
                chart.legend.color = legendFontColorInput.value;
                chart.validateNow();
            }, 350)
        }
        legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.fontColor}</label>`);
        legendOptions.appendChild(legendFontColorInput);
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
        legendOptions.appendChild(legendHorizontalMarginInput);
        //Legend Position
        const legendPositionSelect = eleFromStr(
        `<select style="margin-bottom : 1rem; width : 100%">
            <option ${chart.legend.position === 'bottom' ? 'selected' : ''} value="bottom">${texts.bottom}</option>
            <option ${chart.legend.position === 'left' ? 'selected' : ''} value="left">${texts.left}</option>
            <option ${chart.legend.position === 'right' ? 'selected' : ''} value="right">${texts.right}</option>
        </selected>`);
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
        legendOptions.appendChild(legendPositionSelect);
        //Legend Label Max Width
        const legendLabelWidthInput = eleFromStr(`<input type="range" step="5" min="50" value="${chart.legend.labelWidth || 100}" max="250">`);
        legendLabelWidthInput.oninput = evt => {
            chart.legend.labelWidth = legendLabelWidthInput.value;
            chart.validateNow();
        }
        legendOptions.insertAdjacentHTML('beforeend',`<label>${texts.maxLabelWidth}</label>`);
        legendOptions.appendChild(legendLabelWidthInput);
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
        drawer.appendChild( switchButtons);
        drawer.appendChild( legendOptions);
    }
    drawer.appendChild( chartOptions);
    /*Include title checkbox
    Removed for now, it broke everything
    const titleIncludeCheck = eleFromStr(`<input style="float: right" id="title-include-${i}" checked="false" type="checkbox">`);
    drawer.insertAdjacentHTML('beforeend',`<label for="title-include-${i}" style="display : inline-block">${texts.includeTitle}</label>`);
    drawer.appendChild(titleIncludeCheck);
    */
    /*DPI Input
    Removed for now
    const dpi = eleFromStr(`<input style="margin-bottom:1rem" type="number" min="300" value="300" max="1200" step="1">`);
    drawer.insertAdjacentHTML('beforeend', '<label style="margin-bottom: 1rem">DPI</label>')
    drawer.appendChild(dpiInput);
    */
    //Export Button
    const exportButton = eleFromStr(`<button class="export-btn super-cool-btn">${texts.exportButton.toUpperCase()}</button>`);
    exportButton.onclick = evt => {
        button.style.visibility = 'visible';
        drawer.style.transform = 'translateX(100%)';
        amChartToCanvas(chart, 3.125 /*titleIncludeCheck.checked*/)
        .then(downloadCanvas)
    }
    drawer.appendChild(exportButton);
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
    //Activating opacity event;
    drawer.onmousedown = evt => {
        if(evt.target.matches('input[type="range"]')){
            drawer.style.opacity = '0.35';
        }
    }
    drawer.onmouseup = evt => {
        if(evt.target.matches('input[type="range"]')){
            drawer.style.opacity = '1';
        }
    }
    appendToEle.appendChild(button);
    appendToEle.appendChild(drawer);
}
function amChartToCanvas(chart, scale, includeTitle=false) {
    const options = {
        backgroundColor : '',
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
    let outerDiv = chart.containerDiv;
    if(includeTitle){
        //Don't even ask
        outerDiv = chart.containerDiv.parentElement.parentElement.parentElement.parentElement;
    }
    document.querySelectorAll('[html2canvas-current-div="true"]').forEach(ele => ele.removeAttribute('html2canvas-current-div'))
    outerDiv.setAttribute('html2canvas-current-div', 'true');
    //Removed for now, it broke on chrome
    //const newTxtDivs = chartTextToHtml(chart);
    return html2canvas(outerDiv, options)
    .then(canvas => {
        //newTxtDivs.remove();
        chart.containerDiv.querySelectorAll('text').forEach(txt => txt.style.visibility = 'visible');
        const ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        return canvas;
    })
}
loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@latest/libs/html2canvas.min.js')
.then( () => loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@latest/libs/rgbcolor.min.js'))
.then( () => loadJS('https://cdn.jsdelivr.net/gh/mojimi/amcharts-export-webextension@latest/libs/canvg.min.js'))
.then(loadAmChartsExportMenu)

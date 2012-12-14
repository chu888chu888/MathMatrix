/**
 * @file mm.loader
 * @author Tairraos (http://xiaole.happylive.org)
 * @Date 2012-12-14
 */
(function($) {
    'use strict';
    var moduleList = [
        'core',
        'config',
        'Matrix'
    ];

    /**
     * load script
     * @param name
     */
    function loadScript(name) {
        var dom = document.createElement('script');
        dom.type = 'text/javascript';
        dom.async = false;
        dom.src = ('js/' + name + '.js');
        document.body.appendChild(dom);
    }

    $.each(moduleList, function(index) {
        loadScript('mm.' + moduleList[index]);
    });

    loadScript('game');
}(jQuery));

/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */

// urlParams is null when used for embedding
window.urlParams = window.urlParams || {};

// isLocalStorage controls access to local storage
window.isLocalStorage = window.isLocalStorage || false;

// Disables loading settings in configured mode
window.mxLoadSettings = window.mxLoadSettings || urlParams['configure'] != '1';

// Checks for SVG support
window.isSvgBrowser = window.isSvgBrowser || navigator.userAgent == null ||
	navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 9;

// CUSTOM_PARAMETERS - URLs for save and export
window.DRAWIO_BASE_URL = window.DRAWIO_BASE_URL || 'https://app.diagrams.net';
window.EXPORT_URL = window.EXPORT_URL || 'https://exp.draw.io/ImageExport4/export';
window.PLANT_URL = window.PLANT_URL || 'https://exp-plant.draw.io/plantuml-1-2020-2';
window.DRAW_MATH_URL = window.DRAW_MATH_URL || window.DRAWIO_BASE_URL + '/math';
window.REALTIME_URL = window.REALTIME_URL || 'cache';
window.DRAWIO_GITLAB_URL = window.DRAWIO_GITLAB_URL || 'https://gitlab.com';
window.DRAWIO_GITLAB_ID = window.DRAWIO_GITLAB_ID || '5cdc018a32acddf6eba37592d9374945241e644b8368af847422d74c8709bc44';
window.SAVE_URL = window.SAVE_URL || 'save';
window.OPEN_URL = window.OPEN_URL || 'import';
window.PROXY_URL = window.PROXY_URL || 'proxy';
window.DRAWIO_VIEWER_URL = window.DRAWIO_VIEWER_URL || null;

// Paths and files
window.SHAPES_PATH = window.SHAPES_PATH || 'shapes';
// Path for images inside the diagram
window.GRAPH_IMAGE_PATH = window.GRAPH_IMAGE_PATH || 'img';
window.TEMPLATE_PATH = window.TEMPLATE_PATH || 'templates';
window.NEW_DIAGRAM_CATS_PATH = window.NEW_DIAGRAM_CATS_PATH || 'newDiagramCats';
window.PLUGINS_BASE_PATH = window.PLUGINS_BASE_PATH || '';

// Directory for i18 files and basename for main i18n file
window.RESOURCES_PATH = window.resourcesPathInVue || window.RESOURCES_PATH || 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || RESOURCES_PATH + '/dia';

// Specifies global configuration via variable
window.DRAWIO_CONFIG = window.DRAWIO_CONFIG || null;

// Sets the base path, the UI language via URL param and configures the
// supported languages to avoid 404s. The loading of all core language
// resources is disabled as all required resources are in grapheditor.
// properties. Note that in this example the loading of two resource
// files (the special bundle and the default bundle) is disabled to
// save a GET request. This requires that all resources be present in
// the special bundle.
window.mxLoadResources = window.mxLoadResources || false;
window.mxLanguage = 'zh';

// Add new languages here. First entry is translated to [Automatic]
// in the menu defintion in Diagramly.js.
window.mxLanguageMap = window.mxLanguageMap ||
{
	'i18n': '',
	'zh' : '简体中文',
};

if (typeof window.mxBasePath === 'undefined') {
	window.mxBasePath = window.mxBasePathInVue || 'mxgraph';
}

window.mxLanguages = ['zh'];


window.uiTheme = 'atlas';
/**
 * Global function for loading local files via servlet
 */
function setCurrentXml(data, filename) {
	if (window.parent != null && window.parent.openFile != null)
	{
		window.parent.openFile.setData(data, filename);
	}
}

/**
 * Overrides splash URL parameter via local storage
 */
(function() 
{
	// Known issue: No JSON object at this point in quirks in IE8
	if (typeof JSON !== 'undefined')
	{
		// Cannot use mxSettings here
		if (isLocalStorage) 
		{
			try
			{
				var value = localStorage.getItem('.drawio-config');
				var showSplash = true;
				
				if (value != null)
				{
					showSplash = JSON.parse(value).showStartScreen;
				}
				
				// Undefined means true
				if (showSplash == false)
				{
					urlParams['splash'] = '0';
				}
			}
			catch (e)
			{
				// ignore
			}
		}
	}
	
	// Customizes export URL
	var ex = urlParams['export'];

	if (ex != null)
	{
		ex = decodeURIComponent(ex);
		
		if (ex.substring(0, 7) != 'http://' &&  ex.substring(0, 8) != 'https://')
		{
			ex = 'http://' + ex;
		}
		
		EXPORT_URL = ex;
	}

	// Customizes gitlab URL
	var glUrl = urlParams['gitlab'];

	if (glUrl != null)
	{
		glUrl = decodeURIComponent(glUrl);
		
		if (glUrl.substring(0, 7) != 'http://' &&  glUrl.substring(0, 8) != 'https://')
		{
			glUrl = 'http://' + glUrl;
		}
		
		DRAWIO_GITLAB_URL = glUrl;
	}
	
	var glId = urlParams['gitlab-id'];

	if (glId != null)
	{
		DRAWIO_GITLAB_ID = glId;
	}

	// URL for logging
	window.DRAWIO_LOG_URL = window.DRAWIO_LOG_URL || '';

	//Adds hard-coded logging domain for draw.io domains
	var host = window.location.host;
	
	if (host != 'test.draw.io')
	{
		var searchString = 'draw.io';
		var position = host.length - searchString.length;
		var lastIndex = host.lastIndexOf(searchString, position);
		
		if (lastIndex !== -1 && lastIndex === position)
		{
			window.DRAWIO_LOG_URL = 'https://log.draw.io';
		}
	}
})();

// Fallback for cases where the hash property is not available
if ((window.location.hash == null || window.location.hash.length <= 1) && urlParams['open'] != null) {
	window.location.hash = urlParams['open'];
}

<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', '<%= appRoot %>');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appRoot %>', 'Page');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appRoot %>', 'Content');


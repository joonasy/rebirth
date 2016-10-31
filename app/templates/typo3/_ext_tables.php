<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', '<%= extensionKey %>');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appNameSpace %>.<%= extensionKeyCapitalize %>', 'Page');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appNameSpace %>.<%= extensionKeyCapitalize %>', 'Content');


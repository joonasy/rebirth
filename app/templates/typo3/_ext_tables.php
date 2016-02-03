<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', '<%= appRoot %>');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appNameSpace %>.<%= appNamePascalize %>', 'Page');
\FluidTYPO3\Flux\Core::registerProviderExtensionKey('<%= appNameSpace %>.<%= appNamePascalize %>', 'Content');


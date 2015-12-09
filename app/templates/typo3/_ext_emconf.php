<?php

/***************************************************************
 * Extension Manager/Repository config file for ext "<%= appRoot %>".
 *
 * Auto generated 09-07-2015 17:52
 *
 * Manual updates:
 * Only the data in the array - everything else is removed by next
 * writing. "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array(
	'title' => '<%= appRoot %>',
	'description' => 'Provider extension for pages content ',
	'category' => 'misc',
	'shy' => 0,
	'version' => '1.0.0',
	'dependencies' => 'cms,extbase,fluid,flux,fluidpages,fluidcontent,vhs',
	'conflicts' => '',
	'priority' => '',
	'loadOrder' => '',
	'module' => '',
	'state' => 'experimental',
	'uploadfolder' => 0,
	'createDirs' => '',
	'modify_tables' => '',
	'clearcacheonload' => 1,
	'lockType' => '',
	'author' => '<%= generatorAuthor %>',
	'author_email' => '',
	'author_company' => '',
	'CGLcompliance' => '',
	'CGLcompliance_note' => '',
	'constraints' => array(
		'depends' => array(
			'typo3' => '4.5-6.2.99',
			'cms' => '',
			'extbase' => '',
			'fluid' => '',
			'flux' => '7.2.3',
			'fluidpages' => '3.3.1',
			'fluidcontent' => '4.3.3',
			'vhs' => '2.3.3',
		),
		'conflicts' => array(
		),
		'suggests' => array(
		),
	),
	'_md5_values_when_last_written' => 'a:0:{}',
	'suggests' => array(
	),
);

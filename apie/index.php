<?php

mb_internal_encoding('UTF-8');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'Configuration/autoloading.php';
require_once 'Configuration/constants.php';

error_reporting(ERROR_SETTING);

spl_autoload_register('autoloading');

use Tulic\aPiE\Base\DiContainer;
use Tulic\aPiE\Base\Finalizer;

$di = new DiContainer();

$finalizer = new Finalizer($di->getService('Tulic\aPiE\Base\RouterController'), Finalizer::MODE_JSON);

echo $finalizer;

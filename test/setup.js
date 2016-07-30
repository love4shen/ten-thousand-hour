'use strict';

require('babel-register');
require('babel-polyfill');
require('react-native-mock/mock');

let chai = require('chai');

chai.expect;

global.expect = chai.expect;

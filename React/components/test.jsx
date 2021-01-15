import * as React from 'react';
import SvgUri from 'react-native-svg-uri';
import testSvg from '../assets/login-hero.svg';
export default () => (
  <SvgUri
    width="200"
    height="200"
    svgXmlData={testSvg}
  />
);
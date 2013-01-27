/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/pages/home/HomePage
 *
 * @author Naresh Bhatia
 */
define(
    [
        'framework/BaseView',
        'app/widgets/intro/IntroWidget',
        'text!app/pages/home/HomePageTemplate.html'
    ],
    function(BaseView, IntroWidget, HomePageTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'home-page',
            className: 'clearfix',

            template: {
                name: 'HomePageTemplate',
                source: HomePageTemplate
            },

            postRender: function() {
                this.addChildren([
                    {
                        id: 'IntroWidget',
                        viewClass: IntroWidget,
                        parentElement: this.$el
                    }
                ]);
            }
        });
    }
);
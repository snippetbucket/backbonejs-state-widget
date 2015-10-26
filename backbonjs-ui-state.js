/* -*- coding: utf-8 -*-
##############################################################################
#
#    SnippetBucket, Enterprise Business Management Solution
#    Copyright (C) 2014-2015 SnippetBucket Technologies, http://snippetbucket.com/
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################*/

var UI_States = Backbone.View.extend({
    initialize: function (option) {
        this.el = option.el;
        var opts = this.el.find('option');
        this.data = [];
        _.each(opts, function(o){
            console.log(o.value);
            this.data.push({o.value:o.text});
        });
        this.state = option.options;
        this.field_id = option.field_id || 'field_id';
        this.render();
    },
    render: function () {
        var lis = '<div id="crumbs"><input type="hidden" id="'+this.field_id+'"><ul>';
        var _t_li = _.template("<li><a data-id='<%= k %>'><%= v %></a></li>");
        _.each(this.state, function(V,K){
              lis += _t_li( {k:K,v:V} ) ;
        });
        lis += '</ul></div>';
        console.log(this.el);
        this.el.append(lis);
    },
    events: {
     "click a": 'click_state',
    },
    click_state: function(e){
        this.el.find('a').removeClass("active");
        $( e.currentTarget ).addClass("active");
        this.set($( e.currentTarget ).attr("data-id"));
    },
    get: function(){
        return this.el.find('#'+this.field_id).val();
    },
    set: function(k){
        this.el.find('#'+this.field_id).val(k);
        this.el.find('a').removeClass("active");
        this.el.find("a[data-id='"+k+"']").addClass("active");
    },
});

// HOW TO USE:
// new UI_States({options:{'draft':'Draft', 'inprogrress':'In Progress','d': 'Done', 'c': 'Cancelled'},el:$(".container_viewmanager")});

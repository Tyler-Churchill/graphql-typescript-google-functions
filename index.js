module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(s,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(10);t.UserSchema="\n    type UserPermission {\n        id: ID!\n    }\n    type User {\n        id: ID!\n        firstName: String\n        lastName: String\n        status: String\n        permissions: [String]\n    }\n\n    type Query {\n        register: Boolean\n    }\n",t.resolvers={Query:{register:()=>n(this,void 0,void 0,function*(){new o.User;return!0})}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=new(r(2).default);process.env.IS_LOCAL&&n.startLocal(),t.api=((e,t)=>{n.http(e,t)})},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function u(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(s,u)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0}),r(3);const o=r(4),i=r(5),s=r(6),u=r(7);t.default=class{constructor(){this.express=i(),this.express.use(s({origin:"*",credentials:!0})),this.server=new o.ApolloServer({schema:u.default,introspection:!0,cacheControl:!0,tracing:!0}),this.server.applyMiddleware({app:this.express})}http(e,t){return n(this,void 0,void 0,function*(){this.express(e,t)})}startLocal(){return n(this,void 0,void 0,function*(){this.express.listen({port:4e3},()=>console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`))})}}},function(e,t){e.exports=require("reflect-metadata")},function(e,t){e.exports=require("apollo-server-express")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("cors")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(8),o=r(9),i=r(0),s=n.makeExecutableSchema({typeDefs:[i.UserSchema],resolvers:o.default});t.default=s},function(e,t){e.exports=require("graphql-tools")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);t.default=[n.resolvers]},function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});const i=r(11);var s,u;!function(e){e.active="USER_ACTIVE",e.banned="USER_BANNED",e.cleaned="USER_CLEANED"}(s||(s={})),function(e){e.admin="PERM_ADMIN"}(u||(u={}));let c=class{};n([i.PrimaryGeneratedColumn("uuid"),o("design:type",String)],c.prototype,"id",void 0),n([i.Column(),o("design:type",String)],c.prototype,"firstName",void 0),n([i.Column({type:"varchar",default:s.active}),o("design:type",String)],c.prototype,"status",void 0),n([i.Column("enum",{enum:[""],array:!0}),o("design:type",Array)],c.prototype,"permissions",void 0),c=n([i.Entity("users")],c),t.User=c},function(e,t){e.exports=require("typeorm")}]);
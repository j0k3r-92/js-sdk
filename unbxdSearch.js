window.Unbxd=window.Unbxd||{
    
};if(!Function.prototype.bind){
    Function.prototype.bind=function(oThis){
        if(typeofthis!=="function"){
            thrownewTypeError("Function.prototype.bind - what is trying to be bound is not callable")
        }varaArgs=Array.prototype.slice.call(arguments,
        1),
        fToBind=this,
        fNOP=function(){
            
        },
        fBound=function(){
            returnfToBind.apply(thisinstanceoffNOP&&oThis?this: oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)))
        };fNOP.prototype=this.prototype;fBound.prototype=newfNOP;returnfBound
    }
}if(!Object.keys)Object.keys=function(o){
    if(o!==Object(o))thrownewTypeError("Object.keys called on a non-object");vark=[
        
    ],
    p;for(pino)if(Object.prototype.hasOwnProperty.call(o,
    p))k.push(p);returnk
};Array.prototype.getUnique=function(){
    varu={
        
    },
    a=[
        
    ];for(vari=0,
    l=this.length;i<l;++i){
        if(u.hasOwnProperty(this[
            i
        ])){
            continue
        }a.push(this[
            i
        ]);u[
            this[
                i
            ]
        ]=1
    }returna
};if(typeofString.prototype.trim!=="function"){
    String.prototype.trim=function(){
        returnthis.replace(/^\s+|\s+$/g,
        "")
    }
}Unbxd.setSearch=function(options){
    this.options=jQuery.extend({
        
    },
    this.defaultOptions,
    options);this.init()
};Handlebars.registerHelper("prepareFacetName",
function(txt){
    txt=txt.replace("_fq",
    "");returntxt.replace("_",
    " ")
});Handlebars.registerHelper("prepareFacetValue",
function(txt){
    returntxt.trim().length>0?txt: "&nbsp;&nbsp;&nbsp;"
});Unbxd.setSearch.prototype.defaultOptions={
    inputSelector: "#search_query",
    searchButtonSelector: "#search_button",
    type: "search",
    getCategoryId: "",
    spellCheck: "",
    spellCheckTemp: "<h3>Did you mean : {{suggestion}}</h3>",
    searchQueryDisplay: "",
    searchQueryDisplayTemp: "<h3>Search results for {{query}} - {{numberOfProducts}}</h3>",
    searchResultContainer: "",
    searchResultSetTemp: "",
    isAutoScroll: false,
    isClickNScroll: false,
    clickNScrollSelector: "",
    pageSize: 15,
    facetMultiSelect: true,
    facetContainerSelector: "",
    facetCheckBoxSelector: "",
    selectedFacetTemp: "{{#each filters}}"+"<ol>"+"<li>"+'<spanclass="label">{
        {
            prepareFacetName@key
        }
    }: </span>'+"{{#each this}}"+'<divclass="refineSect">{
        {
            @key
        }
    }<ahref="#"class="btn-remove"></a>'+"</div>"+"{{/each}}"+"</li>"+"</ol>"+"{{/each}}",
    selectedFacetContainerSelector: "",
    clearSelectedFacetsSelector: "",
    removeSelectedFacetSelector: "",
    loaderSelector: "",
    onFacetLoad: "",
    onIntialResultLoad: "",
    onPageLoad: "",
    sanitizeQueryString: function(q){
        returnq
    },
    getFacetStats: "",
    processFacetStats: function(obj){
        
    },
    setDefaultFilters: function(){
        
    },
    enableBuckets: false,
    noOfBuckets: 5,
    bucketSize: 5,
    bucketField: "",
    bucketResultSetTemp: ""
};jQuery.extend(Unbxd.setSearch.prototype,
{
    compiledResultTemp: false,
    compiledBucketResultTemp: false,
    compiledSpellCheckTemp: false,
    compiledSearchQueryTemp: false,
    compiledFacetTemp: false,
    compiledSelectedFacetTemp: false,
    currentNumberOfProducts: 0,
    totalNumberOfProducts: 0,
    isLoading: false,
    params: {
        query: "*",
        filters: {
            
        },
        ranges: {
            
        },
        sort: {
            
        },
        categoryId: "",
        extra: {
            wt: "json",
            page: 1,
            rows: 12
        }
    },
    isHistory: !!(window.history&&history.pushState),
    popped: false,
    initialURL: "",
    isHashChange: false,
    currentHash: "",
    hashChangeInterval: null,
    init: function(){
        this.isHashChange=!!("onhashchange"inwindow.document.body);this.$input=jQuery(this.options.inputSelector);this.$input.val("");this.input=this.$input[
            0
        ];this.setEvents();this.reset();this.params.categoryId=this.options.type=="browse"&&typeofthis.options.getCategoryId=="function"?this.options.getCategoryId(): "";if(this.params.categoryId.length>0){
            if(typeofthis.options.setDefaultFilters=="function")this.options.setDefaultFilters.call(this);this.setPage(1).setPageSize(this.options.pageSize);this.callResults(this.paintResultSet)
        }elseif(this.options.type=="search"&&this.input.value.trim().length){
            if(typeofthis.options.setDefaultFilters=="function")this.options.setDefaultFilters.call(this);this.params.query=this.$input.val().trim();jQuery(this.options.searchResultContainer).html("");this.setPage(1).setPageSize(this.options.pageSize);this.callResults(this.paintResultSet)
        }else{
            varcur_url=window.location.hash.substring(1)||window.location.search.substring(1),
            urlqueryparams=this.getQueryParams(cur_url),
            decodedParams=this.getQueryParams(this.decode(cur_url)),
            queryparamcount=Object.keys(urlqueryparams).length,
            decodedParamscount=Object.keys(decodedParams).length;if(decodedParamscount>0){
                urlqueryparams=this._processURL(decodedParams)
            }else{
                urlqueryparams=this._processURL(urlqueryparams)
            }if(this.options.type=="search"){
                this.params=urlqueryparams;if(typeofthis.options.setDefaultFilters=="function")this.options.setDefaultFilters.call(this);if(!("query"inthis.params)||(this.params.query+"").trim().length==0)this.params.query="*";this.params.query=this.options.sanitizeQueryString.call(this,
                this.params.query);this.$input.val(this.params.query!="*"?this.params.query: "");jQuery(this.options.searchResultContainer).html("");this.setPage(1).setPageSize(this.options.pageSize);if(this.params.query){
                    this.callResults(this.paintResultSet)
                }
            }elseif(this.options.type=="browse"&&"categoryId"inurlqueryparams&&urlqueryparams[
                "categoryId"
            ].trim().length>0){
                this.params=urlqueryparams;if(typeofthis.options.setDefaultFilters=="function")this.options.setDefaultFilters.call(this);this.setPage(1).setPageSize(this.options.pageSize);this.callResults(this.paintResultSet)
            }
        }
    },
    getClass: function(object){
        returnObject.prototype.toString.call(object).match(/^\[
            object\s(.*)\
        ]$/)[
            1
        ]
    },
    setEvents: function(){
        varself=this;if(this.options.type=="search"){
            if("form"inthis.input&&this.input.form){
                jQuery(this.input.form).bind("submit",
                function(e){
                    e.preventDefault();self.reset();self.params.query=self.options.sanitizeQueryString.call(self,
                    self.input.value);jQuery(self.options.searchResultContainer).html("");self.clearFilters().setPage(1).setPageSize(self.options.pageSize);if(self.params.query)self.callResults(self.paintResultSet,
                    true)
                })
            }else{
                this.$input.bind("keydown",
                function(e){
                    if(e.which==13){
                        e.preventDefault();self.reset();self.params.query=self.options.sanitizeQueryString.call(self,
                        self.input.value);jQuery(self.options.searchResultContainer).html("");self.clearFilters().setPage(1).setPageSize(self.options.pageSize);if(self.params.query)self.callResults(self.paintResultSet,
                        true)
                    }
                });if(this.options.searchButtonSelector.length){
                    jQuery(this.options.searchButtonSelector).bind("click",
                    function(e){
                        e.preventDefault();self.reset();self.params.query=self.options.sanitizeQueryString.call(self,
                        self.input.value);jQuery(self.options.searchResultContainer).html("");self.clearFilters().setPage(1).setPageSize(self.options.pageSize);if(self.params.query)self.callResults(self.paintResultSet,
                        true)
                    })
                }
            }
        }if(this.options.isClickNScroll){
            jQuery(this.options.clickNScrollSelector).bind("click",
            function(e){
                if(self.enableBuckets)returnfalse;e.preventDefault();self.setPage(self.getPage()+1);if(self.params.query)self.callResults(self.paintProductPage)
            })
        }if(this.options.isAutoScroll){
            jQuery(window).scroll(function(){
                if(self.enableBuckets)returnfalse;varwind=jQuery(window),
                docu=jQuery(document);if(wind.scrollTop()>docu.height()-window.innerHeight-100&&self.currentNumberOfProducts<self.totalNumberOfProducts&&!self.isLoading){
                    self.setPage(self.getPage()+1).callResults(self.paintProductPage)
                }
            })
        }if(this.options.facetContainerSelector.length>0){
            jQuery(this.options.facetContainerSelector).delegate(self.options.facetCheckBoxSelector,
            "change",
            function(e){
                varbox=jQuery(this),
                el=box.parents(self.options.facetElementSelector);if(box.is(":checked")&&typeofself.options.facetOnSelect=="function"){
                    self.options.facetOnSelect(el)
                }if(!box.is(":checked")&&typeofself.options.facetOnDeselect=="function"){
                    self.options.facetOnDeselect(el)
                }self[
                    box.is(":checked")?"addFilter": "removeFilter"
                ](box.attr("unbxdParam_facetName"),
                box.attr("unbxdParam_facetValue"));self.setPage(1).callResults(self.paintResultSet,
                true)
            })
        }if(this.options.clearSelectedFacetsSelector.length>0){
            jQuery(this.options.clearSelectedFacetsSelector).bind("click",
            function(e){
                e.preventDefault();self.clearFilters().setPage(1).callResults(self.paintResultSet,
                true)
            })
        }if(this.options.removeSelectedFacetSelector.length>0){
            jQuery(this.options.selectedFacetContainerSelector).delegate(this.options.removeSelectedFacetSelector,
            "click",
            function(e){
                e.preventDefault();var$t=jQuery(this),
                name=$t.attr("unbxdParam_facetName"),
                val=$t.attr("unbxdParam_facetValue"),
                checkbox_sel=self.options.facetCheckBoxSelector+"[unbxdParam_facetName='"+name+"'][unbxdParam_facetValue='"+val+"']";jQuery(checkbox_sel).removeAttr("checked");if(typeofself.options.facetOnDeselect=="function"){
                    self.options.facetOnDeselect(jQuery(checkbox_sel).parents(self.options.facetElementSelector))
                }self.removeFilter(name,
                val).setPage(1).callResults(self.paintResultSet,
                true)
            })
        }if(this.isHistory){
            self.popped="state"inwindow.history;self.initialURL=location.href;jQuery(window).bind("popstate",
            function(e){
                varinitialPop=self.popped&&location.href==self.initialURL;self.popped=false;if(initialPop||!e.originalEvent.state)return;varold_params=e.originalEvent.state;self.reset();self.setPage(1);if(old_params.query||old_params.categoryId){
                    self.params=old_params;self.callResults(self.paintResultSet)
                }
            })
        }elseif(this.isHashChange){
            jQuery(window).bind("hashchange",
            function(e){
                varnewhash=window.location.hash.substring(1);if(newhash&&newhash!=self.currentHash){
                    self.reset();varold_params=self._processURL(self.decode(newhash));old_params.query=self.options.type=="search"?self.options.sanitizeQueryString(old_params.query): "";self.currentHash=newhash;if(old_params.query||old_params.categoryId){
                        self.params=old_params;self.callResults(self.paintResultSet)
                    }
                }
            })
        }else{
            self.hashChangeInterval=setInterval(function(){
                varnewhash=location.hash.substring(1);if(newhash&&newhash!=self.currentHash){
                    self.reset();varold_params=self._processURL(self.decode(newhash));old_params.query=self.options.type=="search"?self.options.sanitizeQueryString(old_params.query): "";self.currentHash=newhash;if(old_params.query||old_params.categoryId){
                        self.params=old_params;self.callResults(self.paintResultSet)
                    }
                }
            },
            3e3)
        }
    },
    addSort: function(field,
    dir){
        this.params.sort[
            field
        ]=dir||"desc";returnthis
    },
    removeSort: function(field){
        if(fieldinthis.params.sort)deletethis.params.sort[
            field
        ];returnthis
    },
    resetSort: function(){
        this.params.sort={
            
        };returnthis
    },
    addFilter: function(field,
    value){
        if(!(fieldinthis.params.filters))this.params.filters[
            field
        ]={
            
        };this.params.filters[
            field
        ][
            value
        ]=field;returnthis
    },
    removeFilter: function(field,
    value){
        if(valueinthis.params.filters[
            field
        ])deletethis.params.filters[
            field
        ][
            value
        ];if(Object.keys(this.params.filters[
            field
        ]).length==0)deletedeletethis.params.filters[
            field
        ];returnthis
    },
    clearFilters: function(){
        this.params.filters={
            
        };returnthis
    },
    addRangeFilter: function(field,
    lb,
    ub){
        this.params.ranges[
            field
        ]={
            lb: lb||"*",
            ub: ub||"*"
        };returnthis
    },
    removeRangeFilter: function(field){
        if(fieldinthis.params.ranges)deletethis.params.ranges[
            field
        ];returnthis
    },
    clearRangeFiltes: function(){
        this.params.ranges={
            
        };returnthis
    },
    setPage: function(pageNo){
        this.params.extra.page=pageNo;returnthis
    },
    getPage: function(){
        returnthis.params.extra.page
    },
    setPageSize: function(pageSize){
        this.params.extra.rows=pageSize;returnthis
    },
    addQueryParam: function(key,
    value,
    dontOverried){
        if(!(keyinthis.params.extra)||!dontOverried){
            this.params.extra[
                key
            ]=value
        }else{
            if(this.getClass(this.params.extra[
                key
            ])!="Array")this.params.extra[
                key
            ]=[
                this.params.extra[
                    key
                ]
            ];this.params.extra[
                key
            ].push(value)
        }returnthis
    },
    getHostNPath: function(){
        return"//search.unbxdapi.com/"+this.options.APIKey+"/"+this.options.siteName+"/"+(this.options.type=="browse"?"browse": "search")
    },
    url: function(){
        varhost_path=this.getHostNPath();varurl="";if(this.options.type=="search"&&this.params[
            "query"
        ]!=undefined){
            url+="&q="+encodeURIComponent(this.params.query)
        }elseif(this.options.type=="browse"&&this.params[
            "categoryId"
        ]!=undefined){
            url+="&category-id="+encodeURIComponent(this.params.categoryId)
        }for(varxinthis.params.filters){
            if(this.params.filters.hasOwnProperty(x)){
                vara=[
                    
                ];for(varyinthis.params.filters[
                    x
                ]){
                    if(this.params.filters[
                        x
                    ].hasOwnProperty(y)){
                        a.push((x+': "'+encodeURIComponent(y.replace(/(^")|("$)/g,""))+'"').replace(/\"{
                            2,
                            
                        }/g,
                        '"'))}}url+="&filter="+a.join("OR")}}var a=[];for(var x in this.params.ranges){if(this.params.ranges.hasOwnProperty(x)){a.push(x+": [
                            "+this.params.ranges[x].lb+"TO"+this.params.ranges[x].ub+"
                        ]")}}if(a.length)url+="&filter="+a.join("OR");a=[];for(var field in this.params.sort){if(this.params.sort.hasOwnProperty(field)){var dir=this.params.sort[field]||"desc";a.push(field+""+dir)}}if(a.length)url+="&sort="+a.join(",
                        ");for(var key in this.params.extra){if(this.params.extra.hasOwnProperty(key)){var value=this.params.extra[key];if(this.getClass(value)=="Array"){value=value.getUnique();for(var i=0;i<value.length;i++){url+="&"+key+"="+encodeURIComponent(value[i])}}else if(!(this.options.enableBuckets&&key=="rows"))url+="&"+key+"="+encodeURIComponent(value)}}url+="&start="+(this.params.extra.page<=1?0:(this.params.extra.page-1)*this.params.extra.rows);url+=this.options.getFacetStats.length>0?"&stats="+this.options.getFacetStats:"";if(this.options.enableBuckets){url+="&bucket.field="+this.options.bucketField;url+="&rows="+this.options.noOfBuckets;url+="&bucket.limit="+this.options.bucketSize}if(this.options.facetMultiSelects)url+="&facet.multiselect=true";return{url:host_path+"?"+url,query:url,host:host_path}},callResults:function(callback,doPush){if(this.isLoading)return;this.isLoading=true;if(this.options.loaderSelector.length>0)jQuery(this.options.loaderSelector).show();var self=this,modifiedCB=callback.bind(self),cb=function(data){this.isLoading=false;if(this.options.loaderSelector.length>0)jQuery(this.options.loaderSelector).hide();if("error"in data)return false;modifiedCB(data)},urlobj=self.url();if(doPush){if(this.isHistory){history.pushState(this.params,null,location.protocol+"//"+location.host+location.pathname+"?"+this.encode(urlobj.query))}else{window.location.hash=this.encode(urlobj.query);this.currentHash=this.encode(urlobj.query)}}jQuery.ajax({url:urlobj.url,dataType:"jsonp",jsonp:"json.wrf",success:cb.bind(self)})},reset:function(){this.totalNumberOfProducts=0;this.currentNumberOfProducts=0;jQuery(this.options.spellCheck).hide();jQuery(this.options.searchResultContainer).empty();jQuery(this.options.facetContainerSelector).empty();this.options.selectedFacetHolderSelector&&jQuery(this.options.selectedFacetHolderSelector).hide();this.options.loaderSelector.length>0&&jQuery(this.options.loaderSelector).hide();this.params={query:"*",filters:{},sort:{},ranges:{},categoryId:"",extra:{wt:"json",page:1,rows:12}}},_processURL:function(url){var obj=typeof url=="string"?this.getQueryParams(url):url,params={query:"",filters:{},sort:{},ranges:{},extra:{wt:"json",page:1,rows:12}};if("filter"in obj){if(this.getClass(obj.filter)=="String")obj.filter=Array(obj.filter);for(var i=0;i<obj.filter.length;i++){var filterStrArr=obj.filter[i].split("OR");for(var x=0;x<filterStrArr.length;x++){var arr=filterStrArr[x].split(": ");if(arr.length==2){arr[1]=arr[1].replace(/\"{2,}/g,'"').replace(/(^")|("$)/g,
                        "").replace(/(^\[
                            )|(\
                        ]$)/g,
                        "");if(!(arr[
                            0
                        ]inparams.filters))params.filters[
                            arr[
                                0
                            ]
                        ]={
                            
                        };varvals=arr[
                            1
                        ].split(" TO ");if(vals.length>1){
                            params.ranges[
                                arr[
                                    0
                                ]
                            ]={
                                lb: isNaN(parseFloat(vals[
                                    0
                                ]))?"*": parseFloat(vals[
                                    0
                                ]),
                                ub: isNaN(parseFloat(vals[
                                    1
                                ]))?"*": parseFloat(vals[
                                    1
                                ])
                            }
                        }else{
                            params.filters[
                                arr[
                                    0
                                ]
                            ][
                                arr[
                                    1
                                ]
                            ]=arr[
                                0
                            ]
                        }
                    }
                }
            }
        }if("sort"inobj){
            varsortarr=obj.sort.split(",");for(vari=0;i<sortarr.length;i++){
                vararr=sortarr[
                    i
                ].split(/\s+(?=\S+$)/);if(arr.length==2){
                    params.sort[
                        arr[
                            0
                        ]
                    ]=arr[
                        1
                    ]||"desc"
                }
            }
        }if("rows"inobj)params.extra.rows=obj.rows;if("q"inobj)params.query=obj.q;if("category-id"inobj)params.categoryId=obj[
            "category-id"
        ];if("boost"inobj)params.extra.boost=obj.boost;returnparams
    },
    paintResultSet: function(obj){
        this._internalPaintResultSet(obj,
        true)
    },
    _internalPaintResultSet: function(obj,
    facetsAlso){
        if("error"inobj)returnfalse;this.totalNumberOfProducts=0;this.currentNumberOfProducts=0;varuri=document.URL;varqueryString={
            
        };uri.replace(newRegExp("([^?=&]+)(=([^&]*))?",
        "g"),
        function($0,
        $1,
        $2,
        $3){
            queryString[
                $1
            ]=$3
        });if(obj.hasOwnProperty("didYouMean")){
            if(obj.buckets&&obj.buckets.totalProducts==0||obj.response&&obj.response.numberOfProducts==0){
                this.params.query=obj.didYouMean[
                    0
                ].suggestion;if(!this.compiledSpellCheckTemp)this.compiledSpellCheckTemp=Handlebars.compile(this.options.spellCheckTemp);jQuery(this.options.spellCheck).html(this.compiledSpellCheckTemp({
                    suggestion: obj.didYouMean[
                        0
                    ].suggestion
                })).show();facetsAlso?this.callResults(this.paintAfterSpellCheck): this.callResults(this.paintOnlyResultSet)
            }else{
                this.params.query=obj.searchMetaData.queryParams.q;if(!this.compiledSpellCheckTemp)this.compiledSpellCheckTemp=Handlebars.compile(this.options.spellCheckTemp);jQuery(this.options.spellCheck).html(this.compiledSpellCheckTemp({
                    suggestion: obj.didYouMean[
                        0
                    ].suggestion
                })).show();facetsAlso?this.callResults(this.paintAfterSpellCheck): this.callResults(this.paintOnlyResultSet)
            }
        }else{
            jQuery(this.options.spellCheck).hide();jQuery(this.options.searchResultContainer).empty();this.paintProductPage(obj);facetsAlso&&this.paintFacets(obj)
        }
    },
    paintOnlyResultSet: function(obj){
        jQuery(this.options.searchResultContainer).empty();this.paintProductPage(obj)
    },
    paintAfterSpellCheck: function(obj){
        jQuery(this.options.searchResultContainer).empty();this.paintProductPage(obj);this.paintFacets(obj)
    },
    paintAfterFacetChange: function(obj){
        jQuery(this.options.searchResultContainer).empty();this.paintProductPage(obj);this.paintSelectedFacets()
    },
    paintProductPage: function(obj){
        if("error"inobj)return;if(!obj.buckets&&!obj.response.numberOfProducts){
            this.reset();this.options.onNoResult.call(this,
            obj);returnthis
        }if(!this.compiledSearchQueryTemp)this.compiledSearchQueryTemp=Handlebars.compile(this.options.searchQueryDisplayTemp);jQuery(this.options.searchQueryDisplay).html(this.compiledSearchQueryTemp({
            query: obj.searchMetaData.queryParams.q,
            numberOfProducts: this.options.enableBuckets?obj.buckets.totalProducts: obj.response.numberOfProducts
        })).show();if(this.options.enableBuckets){
            varprocessed=[
                
            ];for(varxinobj.buckets){
                if(obj.buckets.hasOwnProperty(x)){
                    if(x==="totalProducts"||x==="numberOfBuckets")continue;processed.push({
                        name: x,
                        numberOfProducts: obj.buckets[
                            x
                        ].numberOfProducts,
                        products: obj.buckets[
                            x
                        ].products.slice()
                    })
                }
            }if(this.getClass(this.options.bucketResultSetTemp)=="Function"){
                this.options.bucketResultSetTemp({
                    buckets: processed
                })
            }else{
                if(!this.compiledBucketResultTemp)this.compiledBucketResultTemp=Handlebars.compile(this.options.bucketResultSetTemp);jQuery(this.options.searchResultContainer).append(this.compiledBucketResultTemp({
                    buckets: processed,
                    query: obj.searchMetaData.queryParams.q,
                    numberOfProducts: this.options.enableBuckets?obj.buckets.totalProducts: obj.response.numberOfProducts
                }))
            }if(typeofthis.options.onIntialResultLoad=="function"){
                this.options.onIntialResultLoad.call(this)
            }
        }else{
            if(this.getClass(this.options.searchResultSetTemp)=="Function"){
                this.options.searchResultSetTemp(obj)
            }else{
                if(!this.compiledResultTemp)this.compiledResultTemp=Handlebars.compile(this.options.searchResultSetTemp);jQuery(this.options.searchResultContainer).append(this.compiledResultTemp(obj.response))
            }if(!this.currentNumberOfProducts&&typeofthis.options.onIntialResultLoad=="function"){
                this.options.onIntialResultLoad.call(this)
            }if(this.currentNumberOfProducts&&typeofthis.options.onPageLoad=="function"){
                this.options.onPageLoad.call(this)
            }this.totalNumberOfProducts=obj.response.numberOfProducts;this.currentNumberOfProducts+=obj.response.products.length;if(this.options.isClickNScroll)jQuery(this.options.clickNScrollSelector)[
                this.currentNumberOfProducts<this.totalNumberOfProducts?"show": "hide"
            ]()
        }
    },
    paintFacets: function(obj){
        if("error"inobj)return;varfacets=obj.facets,
        facetKeys=Object.keys(facets),
        newfacets=[
            
        ],
        singlefacet={
            
        },
        self=this,
        facetVal="",
        isSelected=false,
        selectedOnly=[
            
        ];for(varxinfacets){
            singlefacet={
                name: self.prepareFacetName(x),
                facet_name: x,
                type: facets[
                    x
                ][
                    "type"
                ],
                selected: [
                    
                ],
                unselected: [
                    
                ]
            };for(vari=0,
            len=facets[
                x
            ][
                "values"
            ].length/2;i<len;i++){
                facetVal=facets[
                    x
                ][
                    "values"
                ][
                    2*i
                ];if(facetVal.trim().length==0)continue;isSelected=xinself.params.filters&&facetValinself.params.filters[
                    x
                ]&&self.params.filters[
                    x
                ][
                    facetVal
                ]==x?true: false;singlefacet[
                    isSelected?"selected": "unselected"
                ].push({
                    value: facetVal,
                    count: facets[
                        x
                    ][
                        "values"
                    ][
                        2*i+1
                    ]
                })
            }if(singlefacet.selected.length+singlefacet.unselected.length>0)newfacets.push(singlefacet)
        }if(this.getClass(this.options.facetTemp)=="Function"){
            this.options.facetTemp({
                facets: newfacets
            })
        }else{
            if(!this.compiledFacetTemp&&this.options.facetTemp.length)this.compiledFacetTemp=Handlebars.compile(this.options.facetTemp);this.options.facetContainerSelector.length&&jQuery(this.options.facetContainerSelector).html(this.compiledFacetTemp({
                facets: newfacets
            }))
        }this.paintSelectedFacets();if(typeofthis.options.onFacetLoad=="function"){
            this.options.onFacetLoad()
        }if(this.options.getFacetStats.length&&typeofthis.options.processFacetStats=="function"&&"stats"inobj){
            obj.stats[
                this.options.getFacetStats
            ].values={
                min: this.options.getFacetStatsinthis.params.ranges&&this.params.ranges[
                    this.options.getFacetStats
                ].lb!="*"?this.params.ranges[
                    this.options.getFacetStats
                ].lb: obj.stats[
                    this.options.getFacetStats
                ].min,
                max: this.options.getFacetStatsinthis.params.ranges&&this.params.ranges[
                    this.options.getFacetStats
                ].ub!="*"?this.params.ranges[
                    this.options.getFacetStats
                ].ub: obj.stats[
                    this.options.getFacetStats
                ].max
            };this.options.processFacetStats(obj.stats)
        }
    },
    paintSelectedFacets: function(){
        varselFacetKeys=Object.keys(this.params.filters);if(selFacetKeys.length&&this.options.selectedFacetTemp&&this.options.selectedFacetContainerSelector){
            if(!this.compiledSelectedFacetTemp)this.compiledSelectedFacetTemp=Handlebars.compile(this.options.selectedFacetTemp);jQuery(this.options.selectedFacetContainerSelector).html(this.compiledSelectedFacetTemp(this.params));jQuery(this.options.selectedFacetHolderSelector).show()
        }else{
            jQuery(this.options.selectedFacetContainerSelector).empty();jQuery(this.options.selectedFacetHolderSelector).hide()
        }
    },
    prepareFacetName: function(txt){
        txt=txt.replace("_fq",
        "");returntxt.replace("_",
        " ")
    },
    getQueryParams: function(q){
        vare,
        d=function(s){
            returndecodeURIComponent(s).replace(/\+/g,
            " ").trim()
        },
        r=/([
            ^&=
        ]+)=?([
            ^&
        ]*)/g,
        urlParams={
            
        };q=q||window.location.hash.substring(1)||window.location.search.substring(1);while(e=r.exec(q)){
            vare1=e[
                1
            ].indexOf("["),
            k=e1=="-1"?e[
                1
            ]: e[
                1
            ].slice(0,
            e1),
            i=e1!="-1"?d(e[
                1
            ].slice(e1+1,
            e[
                1
            ].indexOf("]",
            e1))): "",
            v=d(e[
                2
            ]);if(v.length==0)continue;if(!(kinurlParams)){
                urlParams[
                    k
                ]=v
            }else{
                if(typeofurlParams[
                    k
                ]!="object"){
                    varold=urlParams[
                        k
                    ];urlParams[
                        k
                    ]=Array(urlParams[
                        k
                    ]);Array.prototype.push.call(urlParams[
                        k
                    ],
                    old)
                }Array.prototype.push.call(urlParams[
                    k
                ],
                v)
            }
        }returnurlParams
    },
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e){
        vart="",
        n,
        r,
        i,
        s,
        o,
        u,
        a,
        f=0;e=this._utf8_encode(e);while(f<e.length){
            n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){
                u=a=64
            }elseif(isNaN(i)){
                a=64
            }t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)
        }returnt
    },
    decode: function(e){
        vart="",
        n,
        r,
        i,
        s,
        o,
        u,
        a,
        f=0;e=e.replace(/[
            ^A-Za-z0-9\+\/\=
        ]/g,
        "");while(f<e.length){
            s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){
                t=t+String.fromCharCode(r)
            }if(a!=64){
                t=t+String.fromCharCode(i)
            }
        }t=this._utf8_decode(t);returnt
    },
    _utf8_encode: function(e){
        e=e.replace(/\r\n/g,
        "\n");vart="";for(varn=0;n<e.length;n++){
            varr=e.charCodeAt(n);if(r<128){
                t+=String.fromCharCode(r)
            }elseif(r>127&&r<2048){
                t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)
            }else{
                t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)
            }
        }returnt
    },
    _utf8_decode: function(e){
        vart="",
        n=0;varr=c1=c2=0;while(n<e.length){
            r=e.charCodeAt(n);if(r<128){
                t+=String.fromCharCode(r);n++
            }elseif(r>191&&r<224){
                c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2
            }else{
                c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3
            }
        }returnt
    }
});
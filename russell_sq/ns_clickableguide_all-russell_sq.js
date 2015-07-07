define("clickableguide/bootstrap-3", ["jquery-1", "istats-1", "clickableguide/pubsub"], function(e, s) {
    var t = function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)] >= 5
        }
        return navigator.userAgent.match(/Android 2./) ? !1 : /MSIE 7/.test(navigator.userAgent) ? !1 : !0
    };
    return {
        $: e,
        pubsub: e,
        empConfig: {
            paths: {
                "bump-3": "http://emp.bbci.co.uk/emp/bump-3/bump-3",
                "jquery-1.9": "http://static.bbci.co.uk/frameworks/jquery/0.3.0/sharedmodules/jquery-1.9.1"
            }
        },
        istats: s,
        browserNotOnThePositionFixedNaughtyList: t
    }
}), define("clickableguide/minihash-3", [], function() {
    var e = function() {
        this._keysSorted = !1, this._sortedKeys = [], this._map = {}, this.isEmpty = !0, this.size = 0
    };
    return e.prototype = {
        keys: function() {
            e = this;
            var s, t = [];
            for (s in e._map) e._map.hasOwnProperty.call(e._map, s) && t.push(s);
            return t
        },
        values: function() {
            e = this;
            var s, t = [];
            for (s in e._map) e._map.hasOwnProperty.call(e._map, s) && t.push(e._map[s]);
            return t
        },
        put: function(s, t) {
            if ("object" == typeof s) throw new Error("TypeError: Keys should be Strings or Numbers");
            e = this, e._keysSorted = !1, this._map[s] = t, this.size = this.size + 1, this.isEmpty && (this.isEmpty = !1)
        },
        get: function(e) {
            return void 0 !== this._map[e] ? this._map[e] : !1
        },
        del: function(e) {
            return void 0 !== this._map[e] ? (delete this._map[e], this.size = this.size - 1, 0 === this.size && (this.isEmpty = !0), !0) : !1
        },
        sortKeys: function() {
            return e = this, e._keysSorted ? e._sortedKeys : (e._sortedKeys = e.keys().sort(function(e, s) {
                return e - s
            }), e._keysSorted = !0, e._sortedKeys)
        }
    }, e
}), define("clickableguide/carousel-3", ["clickableguide/bootstrap-3"], function(e) {
    var s = function(s, t, i, n) {
        this.elm = e.$(s), this.vocab = t, this.pubsubNamespace = "ns-carousel-russell_sq--" + i, this.items = this.elm.find(".ns-carousel-russell_sq__item"), this.currentItem = 0, this.ctaOffset = n - 32, this.addNav();
        var a = this;
        e.pubsub.on(this.pubsubNamespace + ":prev", function() {
            a.prev()
        }), e.pubsub.on(this.pubsubNamespace + ":next", function() {
            a.next()
        }), e.pubsub.on("ns-panel-russell_sq:show", function(e) {
            a.fadeInNav(e)
        }), e.pubsub.on(this.pubsubNamespace + ":show_nav", function(e) {
            void 0 === e && (e = a.insideVisibleSection()), a.fadeInNav(e)
        }), e.pubsub.on(this.pubsubNamespace + ":hide_nav", function() {
            a.fadeOutNav()
        }), this.elm[0].addEventListener("click", function(s) {
            a.navDelegation(s), e.pubsub.emit("ns-clickable_guide-russell_sq:carousel:navigated")
        }, !1), this.elm[0].addEventListener("mouseover", function() {
            e.pubsub.emit(a.pubsubNamespace + ":show_nav")
        }, !1), this.elm[0].addEventListener("mouseout", function() {
            e.pubsub.emit(a.pubsubNamespace + ":hide_nav")
        }, !1), this.show(0)
    };
    return s.prototype = {
        fadeInNav: function(e) {
            (e || this.insideVisibleSection()) && this.elm.find(".ns-carousel-russell_sq__nav").addClass("ns-carousel-russell_sq__nav--faded-in")
        },
        fadeOutNav: function() {
            this.elm.find(".ns-carousel-russell_sq__nav").removeClass("ns-carousel-russell_sq__nav--faded-in")
        },
        insideVisibleSection: function() {
            return !!this.elm.find(".ns-carousel-russell_sq__nav").closest(".ns-panel-russell_sq__section--show").length
        },
        show: function(s) {
            this.currentItem = s, this.items.removeClass("ns-carousel-russell_sq__item--show"), e.$(this.items[s]).addClass("ns-carousel-russell_sq__item--show")
        },
        next: function() {
            var e = this.currentItem + 1;
            e >= this.items.length && (e = 0), this.show(e)
        },
        prev: function() {
            var e = this.currentItem - 1;
            0 > e && (e = this.items.length - 1), this.show(e)
        },
        addNav: function() {
            this.elm.append('<div class="ns-carousel-russell_sq__nav"><a href="#" class="ns-carousel-russell_sq__next-prev ns-carousel-russell_sq__prev" ><span class="ns-panel-russell_sq__hide">' + this.vocab.prevImage + '</span><span class="ns-carousel-russell_sq__arrow-left "></span><span class="ns-carousel-russell_sq__arrow-left--inside"></span></a><a href="#" class="ns-carousel-russell_sq__next-prev ns-carousel-russell_sq__next" ><span class="ns-panel-russell_sq__hide">' + this.vocab.nextImage + '</span><span class="ns-carousel-russell_sq__arrow-right"></span><span class="ns-carousel-russell_sq__arrow-right--inside"></span></a></div>')
        },
        navDelegation: function(s) {
            var t = e.$(s.target).closest(".ns-carousel-russell_sq__next-prev");
            return t.length > 0 && (t.hasClass("ns-carousel-russell_sq__prev") && e.pubsub.emit(this.pubsubNamespace + ":prev"), t.hasClass("ns-carousel-russell_sq__next") && e.pubsub.emit(this.pubsubNamespace + ":next")), s.preventDefault(), s.stopPropagation(), !1
        }
    }, s
}), define("clickableguide/imager-3", ["clickableguide/bootstrap-3"], function(e) {
    var s = function(e) {
        this.widths = e.availableWidths || [320, 640, 1024], this.regex = e.regex || /^(.+\/)\d+$/i, this.is_resizing = !1, this.onImagesReplaced = e.onImagesReplaced || function() {}, this.change_divs_to_imgs(), this.init_resize_images()
    };
    return s.prototype = {
        change_divs_to_imgs: function() {
            var s = this;
            e.$(".idt-delayed-image-load-russell_sq").each(function(t, i) {
                var n = e.$(i);
                i.className.search("js-no_replace") > -1 || setTimeout(function() {
                    n.removeClass("delayed-image-load");
                    var t = e.$('<img src="' + s.calc_img_src(n.attr("data-src"), n.width()) + '" alt="' + (n.attr("data-alt") || "") + '" class="js-image_replace ' + n.attr("class") + '" />');
                    n.after(t)
                }, 1)
            })
        },
        calc_img_src: function(e, s) {
            return null === e ? !1 : e.replace(/(\/{cg_width}\/)/, "/" + this.match_closest_value(s, this.widths) + "/")
        },
        match_closest_value: function(e, s) {
            for (var t = s[0], i = 0, n = s.length; n > i; i++) {
                if (e < s[i]) return t;
                t = s[i]
            }
            return t
        },
        init_resize_images: function() {
            var e = this;
            window.addEventListener("resize", function() {
                e.resize_images()
            }, !1)
        },
        resize_images: function() {
            var s = e.$(".js-image_replace"),
                t = this;
            this.is_resizing || (this.is_resizing = !0, null !== s && s.each(function() {
                if (!e.$(this).hasClass("js-no_replace")) {
                    var s = t.calc_img_src(this.getAttribute("datasrc") || this.src, this.clientWidth);
                    s && this.src !== s && (this.src = s)
                }
            }), this.is_resizing = !1, this.onImagesReplaced())
        }
    }, s
}), define("js/clickableguide/main-3", ["clickableguide/bootstrap-3", "clickableguide/minihash-3", "clickableguide/carousel-3", "clickableguide/imager-3"], function(e, s, t, i) {
    var n = function(s, t, i) {
        this.elm = e.$(s), this.vocab = t, this.opts = i || {
            panelPosition: "centre_of_interactive"
        }, this.initPanels(), this.initCarousels(), this.callImager(this.opts), this.applyOptions(this.opts), this.setupPubsubs(), this.empVisible = !1, this.tellIstatsTheInitialLayoutMode(e.$(window).width(), e.$(window).height(), i), this.setResponsiveSiteToBeFullWidth(this.opts)
    };
    return n.prototype = {
        initPanels: function() {
            this.panels = new s, this.empPanels = new s, this.buildMiniHash(this.elm.find(".ns-panel-russell_sq__section--int"), this.panels), this.buildMiniHash(this.elm.find(".ns-panel-russell_sq__section--emp"), this.empPanels), this.currentPanel = this.panels.sortKeys()[0], this.poster = ""
        },
        initCarousels: function() {
            var e = this;
            this.elm.find(".ns-carousel-russell_sq").each(function(s) {
                {
                    var i = this;
                    new t(i, e.vocab, e.createUniqueId(), e.getOffsetValue(s))
                }
            })
        },
        applyOptions: function(e) {
            e.panelsPosition = e.panelsPosition || "default", this.choosePanelPosition(e.panelsPosition), this.addMask(e.mask), this.setMinWidthAndHeight(e), e.nextPrevButtons && this.addNextPrevButtons()
        },
        setupPubsubs: function() {
            this.listenForPubsubEvents(), this.listenForClicks()
        },
        callImager: function(s) {
            var t = {
                availableWidths: [96, 130, 165, 200, 235, 270, 304, 340, 375, 410, 445, 485, 520, 555, 590, 625, 660, 695, 736, 772, 800, 834, 872, 904, 936, 976],
                onImagesReplaced: function() {
                    var t = s.panelsPosition || "default";
                    e.pubsub.emit("ns-clickable_guide-russell_sq:imager:updated", [t])
                }
            };
            s.responsive || (t.onResize = !1), new i(t)
        },
        listenForPubsubEvents: function() {
            var s = this;
            e.pubsub.on("ns-panel-russell_sq:show", function(t) {
                s.hide(), s.choosePanelPosition(s.opts.panelsPosition), s.show(t), e.istats.log("open-panel", "newsindep-interaction", {
                    view: t
                })
            }), e.pubsub.on("ns-panel-russell_sq:hide", function() {
                s.hide()
            }), e.pubsub.on("ns-clickable_guide-russell_sq:imager:updated", function(e) {
                s.choosePanelPosition(e)
            }), e.pubsub.on("ns-clickable_guide-russell_sq:carousel:navigated", function() {})
        },
        listenForClicks: function() {
            var s = this;
            e.$(".ns-panel-russell_sq__hotspot ").click(function(e) {
                return s.preventDefaults(e, function() {
                    s.launchPanel(e, s)
                })
            }), e.$(".ns-panel-russell_sq__video__cta").on("mousedown", function(e) {
                return s.preventDefaults(e, function() {
                    s.launchPanel(e, s), s.isVideoInViewport(e.currentTarget) || e.currentTarget.scrollIntoView(!1)
                })
            }), e.$(".ns-panel-russell_sq__prev").click(function(e) {
                return s.preventDefaults(e, function() {
                    s.prev()
                })
            }), e.$(".ns-panel-russell_sq__next").click(function(e) {
                return s.preventDefaults(e, function() {
                    s.next()
                })
            }), e.$(".ns-panel-russell_sq__section-close").click(function(t) {
                return s.preventDefaults(t, function() {
                    e.pubsub.emit("ns-panel-russell_sq:hide")
                })
            }), this.maskElm && this.maskElm[0].addEventListener("click", function() {
                e.pubsub.emit("ns-panel-russell_sq:hide")
            }, !1)
        },
        launchPanel: function(s, t) {
            var i = t.getPanelIndexFromHref(e.$(s.currentTarget).attr("href"));
            e.pubsub.emit("ns-panel-russell_sq:show", [i])
        },
        getPanelIndexFromHref: function(e) {
            return e.replace(/^\D+/g, "")
        },
        setMinWidthAndHeight: function(s) {
            var t = this;
            t.interactiveMinWidth = 0, t.interactiveMinHeight = 0, s.interactiveMinWidth && s.responsive && s.interactiveMinHeight && (this.interactiveMinWidth = s.interactiveMinWidth, this.interactiveMinHeight = s.interactiveMinHeight, window.addEventListener("resize", function() {
                t.showHideClickableGuide(e.$(window).width(), e.$(window).height())
            }, !1)), this.showHideClickableGuide(e.$(window).width(), e.$(window).height())
        },
        buildMiniHash: function(s, t) {
            s.each(function() {
                var s = e.$(this);
                t.put(s.attr("id").split("section-")[1], s)
            })
        },
        getOffsetValue: function(s) {
            return e.$(this.panels.get(s)).find(".ns-panel-russell_sq__section-header").outerHeight(!0) || 0 + e.$(this.panels.get(s)).find(".ns-panel-russell_sq__section-sub-header").outerHeight(!0) || 0
        },
        getContextSize: function() {
            return this.elm.find(".ns-panel-russell_sq__hotspots>img").outerHeight(!0) + this.elm.find(".ns-panel-russell_sq__clickable").outerHeight(!0)
        },
        createUniqueId: function() {
            return this.elm.attr("id") + (new Date).getTime()
        },
        loadBump: function(s) {
            var t = this;
            require(e.empConfig, ["bump-3"], function(e) {
                t.loadEmp(e, s)
            })
        },
        loadEmp: function(s, t) {
            var i = this,
                n = t.find(".ns-panel-russell_sq__section-emp-data"),
                a = n.attr("data-playlist"),
                o = (new Date).getTime();
            this.poster = t.find(".ns-panel-russell_sq__section-emp-img"), this.empVisible || (this.empVisible = !0, i.elm.append('<div id="ns-player--' + o + '" class="ns-panel-russell_sq__emp_player"></div>'), i.emp = {
                elm: e.$("#ns-player--" + o),
                player: s("#ns-player--" + o).player({
                    product: "news",
                    playerProfile: a,
                    responsive: !1,
                    autoplay: !0
                })
            }), this.poster.addClass("ns-panel-russell_sq__section-emp-img--hide"), i.emp.player.poster(this.poster.attr("src")), i.sizeEmp(), i.emp.player.load(a), n.after(i.emp.elm)
        },
        sizeEmp: function() {
            this.empVisible && null !== this.poster.width() && null !== this.poster.height() && (this.emp.player.width(this.poster.width().toString() || "640"), this.emp.player.height((.5625 * this.emp.player.width()).toString() || "360"))
        },
        hideEmp: function() {
            e.$(".ns-panel-russell_sq__section-emp-img").removeClass("ns-panel-russell_sq__section-emp-img--hide"), this.empVisible && (this.elm.find(".ns-panel-russell_sq__emp_player").remove(), this.empVisible = !1)
        },
        show: function(s) {
            this.hide(), this.currentPanel = s;
            var t = e.$(this.panels.get(s));
            t.addClass("ns-panel-russell_sq__section--show"), this.setHotspotActiveState(s), this.maskElm && (this.showMask(), this.maskElm.height(e.$("#blq-container-outer, #blq-container")[0].clientHeight)), this.empPanels.get(s) !== !1 ? this.loadBump(t) : this.hideEmp()
        },
        hide: function() {
            this.hideEmp(), this.elm.find(".ns-panel-russell_sq__section--show").removeClass("ns-panel-russell_sq__section--show"), this.currentPanel = this.panels.sortKeys()[0], this.hideMask(), this.setHotspotActiveState(0)
        },
        next: function() {
            var s, t = this.panels.sortKeys();
            t.indexOf(this.currentPanel) === t.length - 1 ? s = this.currentPanel : (s = t[t.indexOf(this.currentPanel) + 1], e.pubsub.emit("ns-panel-russell_sq:show", [s]))
        },
        prev: function() {
            var s = this.panels.sortKeys();
            if (s.indexOf(this.currentPanel) > 0) {
                var t = s[s.indexOf(this.currentPanel) - 1];
                e.pubsub.emit("ns-panel-russell_sq:show", [t])
            }
        },
        addNextPrevButtons: function() {
            for (var s = this, t = s.panels.sortKeys(), i = 0; i < s.panels.size; i++) {
                var n = t[i],
                    a = '<a href="#ns-panel-russell_sq__section-' + t[i - 1] + '" class="ns-panel-russell_sq__next-prev ns-panel-russell_sq__prev">',
                    o = '<a href="#ns-panel-russell_sq__section-' + t[i + 1] + '" class="ns-panel-russell_sq__next-prev ns-panel-russell_sq__next">';
                0 === i ? a = '<a href="#" class="ns-panel-russell_sq__next-prev ns-panel-russell_sq__prev ns-panel-russell_sq__next-prev--disabled">' : i === s.panels.size - 1 && (o = '<a href="#" class="ns-panel-russell_sq__next-prev ns-panel-russell_sq__next ns-panel-russell_sq__next-prev--disabled">'), e.$(s.panels.get(n)).append('<div class="ns-panel-russell_sq__section-nav">' + a + '<span class="ns-panel-russell_sq__hide">' + s.vocab.prev + '</span><span class="ns-panel-russell_sq__arrow-left "></span><span class="ns-panel-russell_sq__arrow-left--inside"></span></a><div class="ns-panel-russell_sq__counter"> ' + (i + 1) + " " + s.vocab.pagingDivider + " " + s.panels.size + " </div>" + o + '<span class="ns-panel-russell_sq__hide">' + s.vocab.next + '</span><span class="ns-panel-russell_sq__arrow-right"></span><span class="ns-panel-russell_sq__arrow-right--inside"></span></a></div>')
            }
        },
        showHideClickableGuide: function(e, s) {
            this.viewportIsBigEnoughForClickableGuide(e, s) ? (this.elm.addClass("ns-panel-russell_sq--interactive"), 0 !== this.currentPanel && this.showMask()) : (this.elm.removeClass("ns-panel-russell_sq--interactive"), this.hideMask()), this.sizeEmp()
        },
        viewportIsBigEnoughForClickableGuide: function(e, s) {
            return e >= this.interactiveMinWidth && s >= this.interactiveMinHeight
        },
        tellIstatsTheInitialLayoutMode: function(s, t, i) {
            var n = "list";
            (this.viewportIsBigEnoughForClickableGuide(s, t) || i.responsive !== !0) && (n = "interactive"), e.istats.log("layout-mode", "newsindep-nonuser", {
                view: n
            })
        },
        addMask: function(s) {
            ("white" === s || "black" === s) && (e.$("body").append('<div class="ns-panel-russell_sq__mask ns-panel-russell_sq__mask--' + s + '"></div>'), this.maskElm = e.$(".ns-panel-russell_sq__mask"))
        },
        showMask: function() {
            this.maskElm && (this.maskElm.addClass("ns-panel-russell_sq__mask--show"), this.maskElm.height(e.$("body").height()))
        },
        hideMask: function() {
            this.maskElm && this.maskElm.removeClass("ns-panel-russell_sq__mask--show")
        },
        preventDefaults: function(e, s) {
            return e.preventDefault(), e.stopPropagation(), s(), !1
        },
        choosePanelPosition: function(s) {
            var t, i, n = this;
            if ("default" === s || "centre_of_interactive" === s)
                for (t in n.panels._map) i = n.panels.get(t), i.css({
                    top: (n.getContextSize() - i.height()) / 2 + "px"
                });
            else if ("right_of_interactive" === s)
                for (t in n.panels._map) i = n.panels.get(t), i.addClass("ns-panel-russell_sq__section--align-right");
            else if ("centre_of_screen" === s && e.browserNotOnThePositionFixedNaughtyList)
                for (t in n.panels._map) i = n.panels.get(t), i.addClass("ns-panel-russell_sq__section--centre_of_screen"), i.css({
                    marginTop: "-" + i.height() / 2 + "px",
                    marginLeft: "-" + i.width() / 2 + "px"
                })
        },
        isVideoInViewport: function(e) {
            var s = e.getBoundingClientRect();
            return s.top >= 0 && s.left >= 0 && s.bottom <= (window.innerHeight || document.documentElement.clientHeight) && s.right <= (window.innerWidth || document.documentElement.clientWidth)
        },
        setHotspotActiveState: function(s) {
            e.$(".ns-panel-russell_sq__hotspot").removeClass("ns-panel-russell_sq__hotspot--active"), e.$(".ns-panel-russell_sq__hotspot--" + s).addClass("ns-panel-russell_sq__hotspot--active")
        },
        setResponsiveSiteToBeFullWidth: function(e) {
            "interactiveMinWidth" in e && e.interactiveMinWidth >= 976
        }
    }, n
});
//# sourceMappingURL=ns_clickableguide_all.js
//# sourceMappingURL=ns_clickableguide_all.js.map
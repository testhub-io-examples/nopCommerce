var AjaxFilters = {
  settings: {
    fetchUrl: false,
    categoryId: 0,
    manufacturerId: 0,
  },

  params: {
    jqXHR: false,
  },

  init: function (settings) {
    this.settings = $.extend({}, this.settings, settings);

    var self = this;

    // todo: add event handlers
    var $viewModeEls = $('[data-viewmode]');
    $viewModeEls.on('click', function (e) {
      if (!$(this).hasClass('selected')) {
        $viewModeEls.toggleClass('selected');
        self.getProducts();
      }
    });

    $('#products-orderby').on('change', function () {
      self.getProducts();
    });

    $('#products-pagesize').on('change', function () {
      self.getProducts();
    })
  },

  getUrl: function (pageNumber) {
    var queryBuilder = createCatalogQueryBuilder(this.settings.fetchUrl)
      .addCategory(this.settings.categoryId)
      .addManufacturer(this.settings.manufacturerId);

    var $options = $('[data-option-id]');
    if ($options && $options.length > 0) {
      var selectedOptions = $.map($options, function (option) {
        var $option = $(option);
        if ($option.is(':checked')) return $(option).data('option-id')
        return null;
      });

      if (selectedOptions && selectedOptions.length > 0) {
        queryBuilder.addOptions(selectedOptions);
      }
    }

    var $viewMode = $('[data-viewmode].selected');
    if ($viewMode && $viewMode.length > 0) {
      queryBuilder.addViewMode($viewMode.data('viewmode'));
    }

    var $pageSize = $('#products-pagesize');
    if ($pageSize && $pageSize.length > 0) {
      queryBuilder.addPageSize($pageSize.val());
    }

    var $order = $('#products-orderby');
    if ($order && $order.length > 0) {
      queryBuilder.addOrder($order.val());
    }

    if (pageNumber) {
      queryBuilder.addPageNumber(pageNumber);
    }

    return queryBuilder.build();
  },

  getProducts: function (pageNumber) {
    if (this.params.jqXHR && this.params.jqXHR.readyState !== 4) {
      this.params.jqXHR.abort();
    }

    this.setLoadWaiting(1);

    var self = this;

    this.params.jqXHR = $.ajax({
      cache: false,
      url: this.getUrl(pageNumber),
      type: 'GET',
      success: function (response) {
      },
      error: function (jqXHR, textStatus, errorThrown) {
      },
      complete: function (jqXHR, textStatus) {
        self.setLoadWaiting();
      }
    });
  },

  setLoadWaiting(enable) {
    var $busyEl = $('.ajax-products-busy');
    if (enable) {
      $busyEl.show();
    } else {
      $busyEl.hide();
    }
  }
}

function createCatalogQueryBuilder(baseUrl) {
  return {
    params: {
      baseUrl: baseUrl,
      query: {}
    },

    addCategory: function (categoryId) {
      this.params.query.categoryId = categoryId;
      return this;
    },

    addManufacturer: function (manufacturerId) {
      this.params.query.manufacturerId = manufacturerId;
      return this;
    },

    addPrices: function (from, to) {
      this.params.query.price = from + '-' + to;
      return this;
    },

    addOptions: function (options) {
      this.params.query.specs = options.join(',');
      return this;
    },

    addPageSize: function (pageSize) {
      this.params.query.pagesize = pageSize;
      return this;
    },

    addPageNumber: function (pageNumber) {
      this.params.query.pagenumber = pageNumber;
      return this;
    },

    addOrder: function (order) {
      this.params.query.orderby = order;
      return this;
    },

    addViewMode: function (viewMode) {
      this.params.query.viewmode = viewMode;
      return this;
    },

    build: function () {
      var query = $.param(this.params.query);
      return baseUrl + '?' + query;
    }
  }
}
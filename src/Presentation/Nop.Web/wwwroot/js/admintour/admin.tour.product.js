$(document).ready(function () {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      popperOptions: {
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 15],
          },
        }],
      },
      classes: 'admin-area-tour',
      cancelIcon: {
        enabled: true
      },
      modalOverlayOpeningPadding: '3',
      scrollTo: { behavior: 'smooth', block: 'center' },
      when: {
        show() {
          const currentStepElement = tour.currentStep.el;
          const header = currentStepElement.querySelector('.shepherd-header');
          const progress = document.createElement('span');
          progress.className = "shepherd-progress";
          progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1}/${tour.steps.length}`;
          header.insertBefore(progress, currentStepElement.querySelector('.shepherd-title'));
        }
      }
    }
  });

  var nextButton = {
    action() {
      return tour.next();
    },
    classes: 'button-next',
    text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
  };

  var backButton = {
    action() {
      return tour.back();
    },
    classes: 'button-back',
    text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
  };

  var doneButton = {
    action() {
      return tour.cancel();
    },
    classes: 'button-done',
    text: LocalResourcesProvider.localized_data.Done,
    secondary: true
  };

  //'Settings button' step
  tour.addStep({
    title: 'Settings button',
    text: 'This <b>Settings</b> button allows you to set up the basic mode to choose which exactly fields you want to be shown on the product edit page',
    attachTo: {
      element: '#product-editor-settings',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Your store URL' step
  tour.addStep({
    title: 'Product details',
    text: 'In these fields, enter the appropriate product details. On the screenshot below you can see how they will be displayed on the product page in the default nopCommerce theme: <div><img src="../../js/admintour/images/product-page.jpg"/></div>',
    attachTo: {
      element: '#product-details-area',
      on: 'bottom'
    },
    classes: 'step-with-image',
    buttons: [backButton, nextButton]
  });

  //'Product price' step
  tour.addStep({
    title: 'Product price',
    text: 'Enter the product price in a predefined currency here. Read more how to manage currencies <a href="https://docs.nopcommerce.com/getting-started/configure-payments/advanced-configuration/currencies.html" target="_blank">here</a>',
    attachTo: {
      element: '#product-price-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product tax category' step
  tour.addStep({
    title: 'Product tax category',
    text: 'Select the product tax category or tick the <b>Tax exempt</b> if needed',
    attachTo: {
      element: '#product-tax-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product shipping info' step
  tour.addStep({
    title: 'Product shipping info',
    text: 'Define product-specific shipping details in this panel',
    attachTo: {
      element: '#product-shipping-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product inventory' step
  tour.addStep({
    title: 'Product inventory',
    text: 'Enter the product inventory info here. <br> <ul><li><b>Don\'t track inventory</b> option allows you to opt for no tracking</li><li><b>Track inventory</b> option is for those who don\'t have product variants, and simply need to know how many items are left</li><li><b>Track inventory by product attributes</b> option is best for you if you have different product attributes combinations and need to track their stock quantity</li></ul>',
    attachTo: {
      element: '#product-inventory-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product pictures' step
  tour.addStep({
    title: 'Product pictures',
    text: 'You can add pictures to your product after you save it for the first time. So click the <b>Save</b> button in the top right and then proceed to the pictures panel',
    attachTo: {
      element: '#product-pictures-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})
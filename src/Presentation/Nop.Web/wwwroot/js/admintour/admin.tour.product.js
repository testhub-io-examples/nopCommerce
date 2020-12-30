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
    title: LocalResourcesProvider.localized_data.ProductSettingsButtonTitle,
    text: LocalResourcesProvider.localized_data.ProductSettingsButtonText,
    attachTo: {
      element: '#product-editor-settings',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Product details' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductDetailsTitle,
    text: LocalResourcesProvider.localized_data.ProductDetailsText,
    attachTo: {
      element: '#product-details-area',
      on: 'bottom'
    },
    classes: 'step-with-image',
    buttons: [backButton, nextButton]
  });

  //'Product price' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductPriceTitle,
    text: LocalResourcesProvider.localized_data.ProductPriceText,
    attachTo: {
      element: '#product-price-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product tax category' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductTaxTitle,
    text: LocalResourcesProvider.localized_data.ProductTaxText,
    attachTo: {
      element: '#product-tax-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product shipping info' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductShippingTitle,
    text: LocalResourcesProvider.localized_data.ProductShippingText,
    attachTo: {
      element: '#product-shipping-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product inventory' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductInventoryTitle,
    text: LocalResourcesProvider.localized_data.ProductInventoryText,
    attachTo: {
      element: '#product-inventory-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Product pictures' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.ProductPicturesTitle,
    text: LocalResourcesProvider.localized_data.ProductPicturesText,
    attachTo: {
      element: '#product-pictures-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})
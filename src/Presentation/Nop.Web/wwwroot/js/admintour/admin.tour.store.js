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

  //'Your store name' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.StoreNameTitle,
    text: LocalResourcesProvider.localized_data.StoreNameText,
    attachTo: {
      element: '#store-name-area',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Your store URL' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.StoreUrlTitle,
    text: LocalResourcesProvider.localized_data.StoreUrlText,
    attachTo: {
      element: '#store-url-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Enable SSL' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.StoreSslTitle,
    text: LocalResourcesProvider.localized_data.StoreSslText,
    attachTo: {
      element: '#ssl-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})
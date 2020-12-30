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
    title: 'Your store name',
    text: 'In this field, enter your store name. For example, the store name will be displayed in newsletter and notification emails sent to your customers',
    attachTo: {
      element: '#store-name-area',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Your store URL' step
  tour.addStep({
    title: 'Your store URL',
    text: 'In this field, enter your store URL. For example, it could be http://www.yourstore.com/ or https://www.yourstore.com/mystore/ if you installed your store in a subdirectory',
    attachTo: {
      element: '#store-url-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Enable SSL' step
  tour.addStep({
    title: 'Enable SSL',
    text: 'If you already have an SSL certificate installed on the server, enable SSL to protect your customers’ data. But <b>do not enable it if you don’t have an SSL certificate installed yet</b>! SSL Certificates provide customer trust and improve site rankings. Note, that some online payment methods require an SSL certificate installed for correct working. Read how to install and configure SSL certification <a href="https://docs.nopcommerce.com/getting-started/advanced-configuration/how-to-install-and-configure-ssl-certification.html" target="_blank">here</a>.',
    attachTo: {
      element: '#ssl-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})
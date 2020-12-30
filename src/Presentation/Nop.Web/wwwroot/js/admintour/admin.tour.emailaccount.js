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

  //'Email address' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountEmailAddressTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountEmailAddressText,
    attachTo: {
      element: '#email-area',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Email display name' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountDisplayNameTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountDisplayNameText,
    attachTo: {
      element: '#display-name-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Host' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountHostTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountHostText,
    attachTo: {
      element: '#host-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Port' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountPortTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountPortText,
    attachTo: {
      element: '#port-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Username' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountUsernameTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountUsernameText,
    attachTo: {
      element: '#username-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Password' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountPasswordTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountPasswordText,
    attachTo: {
      element: '#password-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'SSL' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountUseSslTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountUseSslText,
    attachTo: {
      element: '#ssl-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Use default credentials' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountDefaultCredentialsTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountDefaultCredentialsText,
    attachTo: {
      element: '#default-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Send test email' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountTestEmailTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountTestEmailText,
    attachTo: {
      element: '#test-email-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})
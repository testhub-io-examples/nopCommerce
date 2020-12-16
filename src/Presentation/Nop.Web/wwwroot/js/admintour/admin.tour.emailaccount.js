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

  //'Email address' step
  tour.addStep({
    title: 'Email address',
    text: 'Enter the "from" email address for all outgoing emails of your store. Example, sales@yourstore.com',
    attachTo: {
      element: '#email-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Email display name' step
  tour.addStep({
    title: 'Email display name',
    text: 'Enter the displayed name for outgoing emails of your store. Example, "Your store sales department"',
    attachTo: {
      element: '#display-name-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Host' step
  tour.addStep({
    title: 'Host',
    text: 'This is the host name or IP address of your mail server. You can normally find this out from your ISP or web host',
    attachTo: {
      element: '#host-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Port' step
  tour.addStep({
    title: 'Port',
    text: 'Enter the SMTP port of your email server. This is usually port 25',
    attachTo: {
      element: '#port-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Username' step
  tour.addStep({
    title: 'Username',
    text: 'Enter the user name which is used to authenticate to your email server',
    attachTo: {
      element: '#username-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Password' step
  tour.addStep({
    title: 'Password',
    text: 'This is the password you use to authenticate to your mail server',
    attachTo: {
      element: '#password-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'SSL' step
  tour.addStep({
    title: 'Use SSL',
    text: 'Check to use Secure Sockets Layer (SSL) to encrypt the SMTP connection.',
    attachTo: {
      element: '#ssl-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Use default credentials' step
  tour.addStep({
    title: 'Use default credentials',
    text: 'Check to use default credentials for the connection.',
    attachTo: {
      element: '#default-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.next();
        },
        classes: 'button-next',
        text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
      }
    ]
  });

  //'Send test email' step
  tour.addStep({
    title: 'Send test email',
    text: 'Enter your email address and send a test email to make sure you set the email account the right way',
    attachTo: {
      element: '#test-email-area',
      on: 'bottom'
    },
    buttons: [
      {
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      },
      {
        action() {
          return tour.cancel();
        },
        classes: 'button-done',
        text: 'Done',
        secondary: true
      }
    ]
  });

  tour.start();
})
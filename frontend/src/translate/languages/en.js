const messages = {
  en: {
    translations: {
      signup: {
        title: "Sign up",
        toasts: {
          success: "User created successfully! Please login!",
          fail: "Error creating user. Check the reported data.",
        },
        form: {
          name: "Name",
          email: "Email",
          password: "Password",
        },
        buttons: {
          submit: "Register",
          login: "Already have an account? Log in!",
        },
      },
      login: {
        title: "Login",
        form: {
          email: "Email",
          password: "Password",
        },
        buttons: {
          submit: "Enter",
          register: "Don't have an account? Register!",
        },
      },
      auth: {
        toasts: {
          success: "Login successfully!",
        },
      },
      dashboard: {
        charts: {
          perDay: {
            title: "Tickets today: ",
          },
        },
        messages: {
          inAttendance: {
            title: "In Service"
          },
          waiting: {
            title: "Waiting"
          },
          closed: {
            title: "Closed"
          }
        }
      },
      connections: {
        title: "Connections",
        toasts: {
          deleted: "WhatsApp connection deleted sucessfully!",
        },
        confirmationModal: {
          deleteTitle: "Delete",
          deleteMessage: "Are you sure? This action cannot be reversed.",
          disconnectTitle: "disconnect",
          disconnectMessage:
            "Are you sure? You will need to scan the QR Code again.",
        },
        buttons: {
          add: "Add WhatsApp",
          disconnect: "Disconnect",
          tryAgain: "Try Again",
          qrcode: "QR CODE",
          newQr: "New QR CODE",
          connecting: "Connectiing",
        },
        toolTips: {
          disconnected: {
            title: "Failed to start WhatsApp session",
            content:
              "Make sure your cell phone is connected to the internet and try again, or request a new QR Code",
          },
          qrcode: {
            title: "Waiting for QR Code read",
            content:
              "Click on 'QR CODE' button and read the QR Code with your cell phone to start session",
          },
          connected: {
            title: "Connection established",
          },
          timeout: {
            title: "Connection with cell phone has been lost",
            content:
              "Make sure your cell phone is connected to the internet and WhatsApp is open, or click on 'Disconnect' button to get a new QRcode",
          },
        },
        table: {
          channel: "Channel",
          name: "Name",
          status: "Status",
          lastUpdate: "Last Update",
          default: "Default",
          actions: "Actions",
          session: "Session",
        },
      },
      whatsappModal: {
        title: {
          add: "Add WhatsApp",
          edit: "Edit WhatsApp",
        },
        form: {
          name: "Name",
          default: "Pattern",
          farewellMessage: "Farewell message",
          isMultidevice: "Multidevice",
        },
        buttons: {
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "WhatsApp saved successfully.",
      },
      qrCode: {
        message: "Read QrCode to start the session",
      },
      contacts: {
        title: "Contacts",
        toasts: {
          deleted: "Contact deleted sucessfully!",
        },
        searchPlaceholder: "Search ...",
        confirmationModal: {
          deleteTitle: "Delete",
          importTitlte: "Import contacts",
          deleteMessage:
            "Are you sure you want to delete this contact? All related tickets will be lost.",
          importMessage: "Do you want to import all contacts from the phone?",
        },
        buttons: {
          import: "Import Contacts",
          add: "Add Contact",
        },
        table: {
          name: "Name",
          whatsapp: "WhatsApp",
          email: "Email",
          actions: "Actions",
        },
      },
      contactModal: {
        title: {
          add: "Add contact",
          edit: "Edit contact",
        },
        form: {
          mainInfo: "Contact details",
          extraInfo: "Additional information",
          name: "Name",
          number: "Whatsapp number",
          email: "Email",
          extraName: "Field name",
          extraValue: "Value",
        },
        buttons: {
          addExtraInfo: "Add information",
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "Contact saved successfully.",
      },
      quickAnswersModal: {
        title: {
          add: "Add Quick Reply",
          edit: "Edit Quick Answer",
        },
        form: {
          shortcut: "Shortcut",
          message: "Quick Reply",
        },
        buttons: {
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "Quick Reply saved successfully.",
      },
      queueModal: {
        title: {
          add: "Add queue",
          edit: "Edit queue",
        },
        form: {
          name: "Name",
          color: "Color",
          greetingMessage: "Greeting message",
          ratingMessage: "Evaluation message",
          transferQueueMessage: "Transfer Message between Sector",
          outOfWorkMessage: "Customize the message when out of office hours",
          startWorkHour: "Timetable: Opening",
          endWorkHour: "Schedule: Closing",
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday",
          holiday: "Holiday",
          token: "Token",
          checkHourExpedient: "Check Office Hours"
        },
        buttons: {
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
      },
      userModal: {
        title: {
          add: "Add user",
          edit: "Edit user",
        },
        form: {
          name: "Name",
          email: "Email",
          password: "Password",
          profile: "Profile",
          whatsapp: "Default Connection",
        },
        buttons: {
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "User saved successfully.",
      },
      tagModal: {
        title: {
          add: "New Tag",
          edit: "Edit Tag",
        },
        form: {
          name: "Name",
          color: "Color"
        },
        buttons: {
          okAdd: "add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "Tag saved successfully.",
      },
      chat: {
        noTicketMessage: "Select a ticket to start chatting.",
      },
      ticketsManager: {
        buttons: {
          newTicket: "New",
        },
      },
      ticketsQueueSelect: {
        placeholder: "Queues",
      },
      tickets: {
        toasts: {
          deleted: "The ticket you were on has been deleted.",
        },
        notification: {
          message: "Message from",
        },
        tabs: {
          open: { title: "Inbox" },
          closed: { title: "Resolved" },
          search: { title: "Search" },
        },
        search: {
          placeholder: "Search tickets and messages.",
        },
        buttons: {
          showAll: "All",
        },
      },
      transferTicketModal: {
        title: "Transfer Ticket",
        fieldLabel: "Type to search for users",
        fieldQueueLabel: "Transfer to queue",
        fieldConnectionLabel: "Transfer to connection",
        fieldQueuePlaceholder: "Please select a queue",
        fieldConnectionPlaceholder: "Please select a connection",
        noOptions: "No user found with this name",
        buttons: {
          ok: "Transfer",
          cancel: "Cancel",
        },
      },
      ticketsList: {
        pendingHeader: "Waiting",
        assignedHeader: "Attending",
        noTicketsTitle: "Nothing here!",
        noTicketsMessage:
          "No tickets found with this status or search term",
        connectionTitle: "Connection that is currently being used.",
        buttons: {
          accept: "Accept",
        },
      },
      newTicketModal: {
        title: "Create Ticket",
        fieldLabel: "Type to search for a contact",
        add: "Add",
        buttons: {
          ok: "Save",
          cancel: "Cancel",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Dashboard",
          connections: "Connections",
          tickets: "Tickets",
          contacts: "Contacts",
          quickAnswers: "Quick answers",
          queues: "Queues & Chatbot",
          schedules: "Schedules",
          tags: "Tags",
          administration: "Management",
          users: "users",
          settings: "Settings",
        },
        appBar: {
          user: {
            profile: "Profile",
            logout: "Logout",
          },
        },
      },
      notifications: {
        noTickets: "No notifications.",
      },
      schedules: {
        title: "Schedules",
        confirmationModal: {
          deleteTitle:
            "Are you sure you want to delete this Schedule?",
          deleteMessage: "This action cannot be reversed.",
        },
        table: {
          contact: "Contact",
          body: "Message",
          sendAt: "Scheduling Date",
          sentAt: "Send date",
          status: "Status",
          actions: "Actions",
        },
        buttons: {
          add: "New Scheduling",
        },
        toasts: {
          deleted: "Schedule deleted successfully.",
        }
      },
      scheduleModal: {
        title: {
          add: "New Scheduling",
          edit: "Edit Schedule",
        },
        form: {
          body: "Message",
          contact: "Contact",
          sendAt: "Scheduling Date",
          sentAt: "Send date"
        },
        buttons: {
          okAdd: "Add",
          okEdit: "Save",
          cancel: "Cancel",
        },
        success: "Schedule saved successfully.",
      },
      queues: {
        title: "Queues",
        table: {
          name: "Name",
          color: "Color",
          greeting: "Greeting message",
          actions: "Actions",
        },
        buttons: {
          add: "Add queue",
        },
        confirmationModal: {
          deleteTitle: "Delete",
          deleteMessage:
            "Are you sure? It cannot be reverted! Tickets in this queue will still exist, but will not have any queues assigned.",
        },
      },
      queueSelect: {
        inputLabel: "Queues",
      },
      quickAnswers: {
        title: "Quick Answers",
        table: {
          shortcut: "Shortcut",
          message: "Quick Reply",
          actions: "Actions",
        },
        buttons: {
          add: "Add Quick Reply",
        },
        toasts: {
          deleted: "Quick Reply deleted successfully.",
        },
        searchPlaceholder: "Search...",
        confirmationModal: {
          deleteTitle:
            "Are you sure you want to delete this Quick Reply: ",
          deleteMessage: "This action cannot be reversed.",
        },
      },
      users: {
        title: "Users",
        table: {
          name: "Name",
          email: "Email",
          profile: "Profile",
          whatsapp: "Default Connection",
          actions: "Actions",
        },
        buttons: {
          add: "Add user",
        },
        toasts: {
          deleted: "User deleted sucessfully.",
        },
        confirmationModal: {
          deleteTitle: "Delete",
          deleteMessage:
            "All user data will be lost. Users' open tickets will be moved to queue.",
        },
      },
      tags: {
        title: "Tags",
        confirmationModal: {
          deleteTitle:
            "Are you sure you want to delete this Tag?",
          deleteMessage: "This action cannot be reversed.",
        },
        table: {
          name: "Name",
          color: "Color",
          tickets: "Tag Records",
          actions: "Actions",
        },
        buttons: {
          add: "New Tag",
        },
        toasts: {
          deleted: "Tag deleted successfully.",
        }
      },
      settings: {
        success: "Settings saved successfully.",
        title: "Settings",
        settings: {
          userCreation: {
            name: "User creation",
            options: {
              enabled: "Ativado",
              disabled: "Desativado",
            },
          },
          timeCreateNewTicket: {
            name: "Welcome message after",
            note: "Select the time it will take to open a new ticket if the customer contacts you again",
            options: {
              "10": "10 Seconds",
              "30": "30 Seconds",
              "60": "1 minute",
              "300": "5 minutes",
              "1800" : "30 minute",
              "3600" : "1 hour",
              "7200" : "2 hours",
              "21600" : "6 hours",
              "43200" : "12 hours",
              "86400" : "24 hours",
              "172800" : "48 hours",
            },
          },  
          call: {
            name: "Accept calls",
            options: {
              enabled: "Activated",
              disabled: "Disabled",
            },
          },
          CheckMsgIsGroup: {
            name: "Ignore Group Messages",
            options: {
                enabled: "Activated",
                disabled: "Disabled",
            },
          },
        },
      },
      messagesList: {
        header: {
          assignedTo: "Assigned to:",
          buttons: {
            return: "Return",
            resolve: "Resolve",
            reopen: "Reopen",
            accept: "Accept",
          },
        },
      },
      messagesInput: {
        placeholderOpen: "Type a message or press ''/'' to use the quick replies registered",
        placeholderClosed:
          "Reopen or accept this ticket to send a message.",
        signMessage: "To sign",
      },
      contactDrawer: {
        header: "Contact details",
        buttons: {
          edit: "Edit contact",
        },
        extraInfo: "Other information",
      },
      ticketOptionsMenu: {
        delete: "Delete",
        transfer: "Transfer",
        confirmationModal: {
          title: "Delete ticket #",
          titleFrom: "from contact ",
          message: "Attention! All ticket's related messages will be lost.",
        },
        buttons: {
          delete: "Delete",
          cancel: "Cancel",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancel",
        },
      },
      messageOptionsMenu: {
        delete: "Delete",
        reply: "Reply",
        confirmationModal: {
          title: "Delete message?",
          message: "This action cannot be reverted.",
        },
      },
      backendErrors: {
        ERR_NO_OTHER_WHATSAPP:
          "There must be at lest one default WhatsApp connection.",
        ERR_NO_DEF_WAPP_FOUND:
          "No default WhatsApp found. Check connections page.",
        ERR_WAPP_NOT_INITIALIZED:
          "This WhatsApp session is not initialized. Check connections page.",
        ERR_WAPP_CHECK_CONTACT:
          "Could not check WhatsApp contact. Check connections page.",
        ERR_WAPP_INVALID_CONTACT: "This is not a valid whatsapp number.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "Unable to download media from WhatsApp. Check the connections page.",
        ERR_INVALID_CREDENTIALS:
          "Authentication error. Please try again.",
        ERR_SENDING_WAPP_MSG:
          "Error sending WhatsApp message. Check the connections page.",
        ERR_DELETE_WAPP_MSG: "Could not delete WhatsApp message.",
        ERR_OTHER_OPEN_TICKET: "There is already an open ticket for this contact.",
        ERR_SESSION_EXPIRED: "Session expired. Please come in.",
        ERR_USER_CREATION_DISABLED:
          "User creation has been disabled by the administrator.",
        ERR_NO_PERMISSION: "You do not have permission to access this resource.",
        ERR_DUPLICATED_CONTACT: "A contact with this number already exists.",
        ERR_NO_SETTING_FOUND: "No configuration found with this ID.",
        ERR_NO_CONTACT_FOUND: "No contacts found with this ID.",
        ERR_NO_TICKET_FOUND: "No tickets found with this ID.",
        ERR_NO_USER_FOUND: "No users found with this ID.",
        ERR_NO_WAPP_FOUND: "No WhatsApp found with this ID.",
        ERR_CREATING_MESSAGE: "Error creating message in database.",
        ERR_CREATING_TICKET: "Error creating ticket in database.",
        ERR_FETCH_WAPP_MSG:
          "Error fetching the message in WhtasApp, maybe it is too old.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "This color is already in use, pick another one.",
        ERR_WAPP_GREETING_REQUIRED:
          "The greeting message is mandatory when there is more than one queue.",
          ERR_FETCHING_FB_USER_TOKEN:
          "Unable to fetch user information from Facebook.",
        ERR_FETCHING_FB_PAGES:
          "Unable to fetch page information on Facebook.",
        ERR_FETCHING_INSTAGRAM_LINKED_PAGE:
          "Unable to fetch information from Instagram page. Make sure the page is associated with a Facebook page.",
        ERR_SUBSCRIBING_PAGE_TO_MESSAGE_WEBHOOKS:
          "Unable to subscribe to facebook messages, contact support.",
      },
    },
  },
};

export { messages };

document.addEventListener('DOMContentLoaded', function () {

  /* Login */
  if (localStorage.getItem('UserLoggedIn') === '1') {
    document.querySelector('div.login').classList.add('hide');
    document.querySelector('body').classList.remove('clip');
  }

  document.querySelector('.login form').addEventListener('submit', sendForm);

  function sendForm(e) {
    e.preventDefault();
    const pass = document.querySelector(`input[type="password"]`).value;
    if (pass == 0) {
      document.querySelector('div.errors').innerHTML = '<p>Please enter a password.</p>';
    } else if (pass === 'SEdemo') {
      console.log('Log them in');
      localStorage.setItem('UserLoggedIn', '1');
      document.querySelector('div.login').classList.add('hide');
      document.querySelector('body').classList.remove('clip');
    } else {
      document.querySelector('div.errors').innerHTML = '<p>Password incorrect, please try again.</p>';
    }
  }


  /* Page selection */
  const pages = document.querySelectorAll(`div[data-page]`);
  const pageControls = document.querySelectorAll(`button[data-page]`);
  const virtualPages = document.getElementById('bvc')

  pageControls.forEach(control => control.addEventListener('click', changePage));

  function changePage() {

    pageControls.forEach(page => page.classList.remove('selected'));

    pages.forEach(page => {
      page.classList.add('hide')
      if (page.getAttribute('data-page') == this.getAttribute('data-page')) {
        page.classList.remove('hide');
        this.classList.add('selected');
      }

    }
    )
  }


  /* Contextual settings pannel */
  const editable = document.querySelectorAll(`[data-editable="yes"]`);
  const editor = document.querySelector('.editor');
  const closeSettingsTrgigger = document.querySelector('.settings a.close');

  /* Highlight editable sections */
  editable.forEach(editableElement => {
    editableElement.insertAdjacentHTML('beforeend', '<span class="editable"></span>');
  });

  function highlightEditable(e) {
    const highlighters = document.querySelectorAll('span.editable');
    highlighters.forEach(hightlight => {
      hightlight.classList.add('animate');
      setTimeout(function () {
        hightlight.classList.remove('animate');
      }, 1000);

    });

  }

  document.querySelector('.show-edditable-sections').addEventListener('click', highlightEditable)

  /* Open settings */
  function openSettings(e) {
    /* Open settings */
    if (!editor.classList.contains('open')) {
      editor.classList.add('open');
    }

    /* Switch settings pannels */
    const dataPanel = this.getAttribute("data-panel");
    const selectedSection = document.querySelectorAll(`.settings [data-panel="${dataPanel}"]`);
    const settingsPanels = document.querySelectorAll(`.settings .section-settings`);
    const currentlySelected = this.getAttribute("data-panel");
    const editing = document.querySelectorAll(`:not(.section-settings)[data-panel="${currentlySelected}"]`);

    const activePointers = document.querySelectorAll('span.pointer');
    activePointers.forEach(activePointer => activePointer.remove());
    editable.forEach(editable => editable.classList.remove('active'));

    editing.forEach(editableElement => {
      editableElement.classList.add('active');
      editableElement.insertAdjacentHTML('beforeend', '<span class="pointer"></span>');
    });

    /* NEEDS TO BE REWORKED */
    selectedSection.forEach(selectedSection => {
      settingsPanels.forEach(settingsPanel => {
        if (settingsPanel.classList.contains('open')) {
          settingsPanel.classList.remove('open');
        }
      })
      if (selectedSection.getAttribute("data-panel") == dataPanel) {
        selectedSection.classList.add('open');
      }
    });

    e.stopPropagation();
  }


  editable.forEach(editable => editable.addEventListener('click', openSettings));

  /* Close settings */
  function closeSettings() {
    editor.classList.remove('open');
    editable.forEach(editable => editable.classList.remove('active'));
  }

  closeSettingsTrgigger.addEventListener('click', closeSettings);

  /* Switches */
  const switchControl = document.querySelectorAll('.switch');
  const showDynamic = document.querySelectorAll('.show-dynamic');

  /* NEEDS TO BE REWORKED use a switch instead */
  function toggleSwitch() {

    // Reformatted with Switch Statement
    const attributeArray = ['data-control-theme', 'data-control-border', 'data-control-text-style', 'data-control-background', 'data-control-radius', 'data-control-shadow', 'data-control-font', 'data-control-height',
      'data-control-shape', 'data-control-textcolor', 'data-control-btn-theme', 'data-control-links', 'data-control-nav', 'data-control-nav-active', 'data-control-active-background', 'data-control-primary-text',
      'data-control-secondary-text', 'data-control-btn-primary', 'data-control-btn-secondary', 'data-control-card-bg', 'data-control-card-border', 'data-control-card-inner-border', 'data-control-stage-background',
      'data-control-test', 'data-control-results', 'data-control-close', 'data-control-tab-static', 'data-control-tab-active', 'data-control-cover-bg', 'data-control-tab-bg', 'data-control-content-bg', 'data-control-stage-bg', 'data-control-card-bg',
      'data-control-header-bg', 'data-control-title-bg']

    let attribute;

    for (let i = 0; i < attributeArray.length; i++) {
      let hasAttribute = this.hasAttribute(attributeArray[i])
      if (hasAttribute === true) {
        attribute = attributeArray[i];
      }
    }

    const activateSwitch = document.querySelectorAll(`.switch[${attribute}]`);

    if (virtualPages) {
      activateSwitch.forEach(x => x.classList.toggle('enabled'));
    } else {
      this.classList.toggle('enabled');
      hideMatchingElements(this);
    }

    switch (attribute) {
      case 'data-control-theme':
        toggleElementTheme(this);;
        break;
      case 'data-control-border':
        toggleHeaderBorder(this);
        break;
      case 'data-control-text-style':
        boldText(this);
        capitalizeText(this);
        break;
      case 'data-control-background':
        toggleElementBackground(this);
        break;
      case 'data-control-radius':
        borderRadius(this);
        break;
      case 'data-control-shadow':
        shadow(this);
        break;
      case 'data-control-font':
        font(this);
        break;
      case 'data-control-height':
        height(this);
        break;
      case 'data-control-shape':
        shape(this);
        break;
      case 'data-control-textcolor':
        textColor(this);
        break;
      case 'data-control-btn-theme':
        btnTheme(this);
        break;
      case 'data-control-links':
        textLinks(this);
        break;
      case 'data-control-nav':
        navStatic(this);
        break;
      case 'data-control-nav-active':
        navActive(this);
        break;
      case 'data-control-active-background':
        toggleElementActiveBackground(this);
        break;
      case 'data-control-primary-text':
        primaryText(this);
        break;
      case 'data-control-secondary-text':
        secondaryText(this);
        break;
      case 'data-control-btn-primary':
      case 'data-control-btn-secondary':
        virtualBtns(this);
        break;
      case 'data-control-card-bg':
        cardBackground(this);
        break;
      case 'data-control-card-border':
      case 'data-control-card-inner-border':
        cardBorder(this);
        break;
      case 'data-control-stage-background':
        toggleStageBackground(this);
        break;
      case 'data-control-test':
      case 'data-control-results':
      case 'data-control-close':
        testSections(this)
        break;
      case attributeArray[24]:
      case 'data-control-tab-static':
        tabStatic(this);
        break;
      case 'data-control-tab-active':
        tabActive(this);
        break;
      case 'data-control-cover-bg':
      case 'data-control-tab-bg':
      case 'data-control-content-bg':
      case 'data-control-stage-bg':
      case 'data-control-card-bg':
      case 'data-control-header-bg':
      case 'data-control-title-bg':
        virtualBackgrounds(this);
        break;
    }
  }

  switchControl.forEach(switchControl => switchControl.addEventListener('click', toggleSwitch));

  showDynamic.forEach(showDynamic => showDynamic.addEventListener('click', showDynamic));

  // ======================= 
  // CSS Override Functions
  // =======================

  /* Toggle element display */
  function toggleElementDisplay(el) {
    el.classList.toggle('hide');
  }

  /* Hide matching elements */
  function hideMatchingElements(el) {
    dataControl = el.getAttribute("data-control-display");
    const targetControl = document.querySelectorAll(`:not(.switch)[data-control-display="${dataControl}"]`);
    targetControl.forEach(targeted => {
      toggleElementDisplay(targeted);
    });
  }

  /* Toggle element theming */
  function toggleElementTheme(el) {
    dataControl = el.getAttribute("data-control-theme");
    document.querySelectorAll(`:not(.switch)[data-control-theme="${dataControl}"]`).forEach(element => {
      element.classList.toggle('themed');
    });
  }

  // Toggle Element Background
  function toggleElementBackground(el) {
    let dataControl = el.getAttribute("data-control-background");
    // let dataControl;
    document.querySelectorAll(`:not(.switch)[data-control-background="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('background');
    });
  }

  /* Toggle header border */
  function toggleHeaderBorder(el) {
    dataControl = el.getAttribute("data-control-border");
    document.querySelectorAll(`:not(.switch)[data-control-border="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('custom-border');
    });
  }

  /* Bold text*/
  function boldText(el) {
    dataControl = el.getAttribute("data-control-text-style");
    document.querySelectorAll(`:not(.switch)[data-control-text-style="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('bold');
    });
  }

  /* Capitalize text */
  function capitalizeText(el) {
    dataControl = el.getAttribute("data-control-text-style");
    document.querySelectorAll(`:not(.switch)[data-control-text-style="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('capitalize');
    });
  }

  /* Border radius */
  function borderRadius(el) {
    dataControl = el.getAttribute("data-control-radius");
    document.querySelectorAll(`:not(.switch)[data-control-radius="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('radius');
    });
  }

  /* Custom shadows */
  function shadow(el) {
    dataControl = el.getAttribute("data-control-shadow");
    document.querySelectorAll(`:not(.switch)[data-control-shadow="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('shadow');
    });
  }

  /* Custom fonts */
  function font(el) {
    dataControl = el.getAttribute("data-control-font");
    document.querySelectorAll(`:not(.switch)[data-control-font="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('font');
    });
  }

  /* Custom height */
  function height(el) {
    dataControl = el.getAttribute("data-control-height");
    document.querySelectorAll(`:not(.switch)[data-control-height="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('height');
    });
  }

  /* Custom shape */
  function shape(el) {
    dataControl = el.getAttribute("data-control-shape");
    document.querySelectorAll(`:not(.switch)[data-control-shape="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('square');
    });
  }

  // Virtual Specific

  /* Text Color*/
  function textColor(el) {
    dataControl = el.getAttribute("data-control-textcolor");
    document.querySelectorAll(`:not(.switch)[data-control-textcolor="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('text-color');
    });
  }

  function textLinks(el) {
    dataControl = el.getAttribute("data-control-links");
    document.querySelectorAll(`:not(.switch)[data-control-links="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('links');
    });
  }

  function btnTheme(el) {
    dataControl = el.getAttribute("data-control-btn-theme");
    document.querySelectorAll(`:not(.switch)[data-control-btn-theme="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('btn-colors');
    });
  }

  function virtualBtns(el) {
    let dataControl = el.getAttribute("data-control-btn-primary") || el.getAttribute("data-control-btn-secondary");

    switch (dataControl) {
      case 'primary':
        document.querySelectorAll(`:not(.switch)[data-control-btn-primary="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('btn-colors');
        });
        break;
      case 'secondary':
        document.querySelectorAll(`:not(.switch)[data-control-btn-secondary="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('btn-colors-2');
        });
        break;
    }

  }

  function navStatic(el) {
    dataControl = el.getAttribute("data-control-nav");
    document.querySelectorAll(`:not(.switch)[data-control-nav="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('nav-static');
    });
  }

  function tabStatic(el) {
    dataControl = el.getAttribute("data-control-tab-static");
    document.querySelectorAll(`:not(.switch)[data-control-tab-static="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('nav-static');
    });
  }

  function navActive(el) {
    dataControl = el.getAttribute("data-control-nav-active");
    document.querySelectorAll(`:not(.switch)[data-control-nav-active="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('nav-active');
    });
  }

  function tabActive(el) {
    dataControl = el.getAttribute("data-control-tab-active");
    document.querySelectorAll(`:not(.switch)[data-control-tab-active="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('nav-active');
    });
  }

  // Chat Sidebar Active Tab BG
  function toggleElementActiveBackground(el) {
    dataControl = el.getAttribute("data-control-active-background");
    document.querySelectorAll(`:not(.switch)[data-control-active-background="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('active-background');
    });
  }

  function primaryText(el) {
    dataControl = el.getAttribute("data-control-primary-text");
    document.querySelectorAll(`:not(.switch)[data-control-primary-text="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('primary-text');
    });
  }

  function secondaryText(el) {
    dataControl = el.getAttribute("data-control-secondary-text");
    document.querySelectorAll(`:not(.switch)[data-control-secondary-text="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('secondary-text');
    });
  }

  // Card BG
  function cardBackground(el) {
    dataControl = el.getAttribute("data-control-card-bg");
    document.querySelectorAll(`:not(.switch)[data-control-card-bg="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('background');
    });
  }

  // Card Border
  function cardBorder(el) {
    let dataControl = el.getAttribute("data-control-card-border") || el.getAttribute("data-control-card-inner-border");

    switch (dataControl) {
      case 'card-border':
        document.querySelectorAll(`:not(.switch)[data-control-card-border="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('custom-border');
        });
        break;
      case 'card-divider':
        document.querySelectorAll(`:not(.switch)[data-control-card-inner-border="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('custom-border');
        });
        break;
    }
  }


  function toggleStageBackground(el) {
    dataControl = el.getAttribute("data-control-stage-background");
    document.querySelectorAll(`:not(.switch)[data-control-stage-background="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('background');
    });
  }

  function testSections(el) {
    dataControl = el.getAttribute("data-control-test") || el.getAttribute("data-control-results") || el.getAttribute("data-control-close");

    switch (dataControl) {
      case 'start':
        document.querySelectorAll(`:not(.switch)[data-control-test="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('hide');
        });
        testBtn.classList.toggle('hide');
        continueBtn.classList.toggle('hide');
        break;
      case 'continue':
        document.querySelectorAll(`:not(.switch)[data-control-test="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('hide');
        });
        document.querySelectorAll(`:not(.switch)[data-control-results="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('hide');
        });
        continueBtn.classList.toggle('hide')
        closeResultsBtn.classList.toggle('hide')
        break;
      case 'close':
        document.querySelectorAll(`:not(.switch)[data-control-results="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('hide');
        });
        closeResultsBtn.classList.toggle('hide')
        testBtn.classList.toggle('hide')
        break;
    }

    document.querySelectorAll(`:not(.switch)[data-control-test="${dataControl}"]`).forEach(selectedSection => {
      selectedSection.classList.toggle('hide');
    });
  }




  function virtualBackgrounds(el) {
    let dataControl = el.getAttribute("data-control-header-bg") || el.getAttribute("data-control-cover-bg") || el.getAttribute("data-control-tab-bg") || el.getAttribute("data-control-content-bg") || el.getAttribute("data-control-stage-bg") || el.getAttribute("data-control-card-bg") || el.getAttribute("data-control-title-bg");

    switch (dataControl) {
      case 'virtual-header':
        document.querySelectorAll(`:not(.switch)[data-control-header-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'cover':
        document.querySelectorAll(`:not(.switch)[data-control-cover-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'chat-tabs':
        document.querySelectorAll(`:not(.switch)[data-control-tab-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'content':
        document.querySelectorAll(`:not(.switch)[data-control-content-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'stage':
        document.querySelectorAll(`:not(.switch)[data-control-stage-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'card':
        document.querySelectorAll(`:not(.switch)[data-control-card-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'header':
        document.querySelectorAll(`:not(.switch)[data-control-header-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
      case 'page-title':
        document.querySelectorAll(`:not(.switch)[data-control-title-bg="${dataControl}"]`).forEach(selectedSection => {
          selectedSection.classList.toggle('background');
        });
        break;
    }
  }

  // END CSS OVERRIDES 
  // ======================= 


  // -------



  /* Toggle editable text */
  function showEditableText() {
    const editableTextElements = document.querySelectorAll(`[data-editable-text="yes"]`);
    this.classList.toggle('on');

    if (this.classList.contains('on')) {
      editableTextElements.forEach(editableTextElement => editableTextElement.insertAdjacentHTML('beforeend', '<span class="highlight"></span>'));
    } else {
      const activeHighlights = document.querySelectorAll('.highlight:not(.dynamic)');
      activeHighlights.forEach(activeHighlights => activeHighlights.remove());
    }
  }

  document.querySelector('.toggle-editable-text').addEventListener('click', showEditableText);

  /* Toggle dynamic content */
  function showDynamicContent() {
    const DynamicContentElements = document.querySelectorAll(`[data-dynamic-content="yes"]`);
    this.classList.toggle('on');

    if (this.classList.contains('on')) {
      DynamicContentElements.forEach(DynamicContentElement => DynamicContentElement.insertAdjacentHTML('beforeend', '<span class="highlight dynamic"></span>'));
    } else {
      const activeHighlights = document.querySelectorAll('.highlight.dynamic');
      activeHighlights.forEach(activeHighlights => activeHighlights.remove());
    }
  }

  document.querySelector('.toggle-dynamic-content').addEventListener('click', showDynamicContent);
});





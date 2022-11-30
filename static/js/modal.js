(function () {
  const $ = ($) => document.getElementById($);

  const $selArr = [
    { sel: "sel_ethnic", type: $ethnic },
    { sel: "sel_nation", type: $nation },
    { sel: "sel_profession", type: $profession },
  ];
  const sectEdit = $("sect_edit");
  const dropdowns = sectEdit.querySelectorAll(".sel-list");
  const socialinp = sectEdit.querySelectorAll(".inp-social");
  const radios = sectEdit.querySelectorAll(".inp-radio-gender");
  const $sectRight = $("sect_right");
  const linkAccordians = $sectRight.querySelectorAll(
    ".link__content-accordian"
  );
  const linkContent = $sectRight.querySelectorAll(".li-content");
  const blurItms = $sectRight.querySelectorAll(".blur-change");

  let updateChange = false;
  let origObj = {
    nation: $nation,
    ethnic: $ethnic,
    profession: $profession,
    gender: $gender,
    notes: null,
    social: [
      { name: "facebook", val: null },
      { name: "twitter", val: null },
      { name: "instagram", val: null },
    ],
  };

  let setchangeObj = {
    url: $('header_url').dataset.title,
    nation: $nation,
    ethnic: $ethnic,
    profession: $profession,
    gender: $gender,
    notes: null,
    social: [
      { name: "facebook", val: null },
      { name: "twitter", val: null },
      { name: "instagram", val: null },
    ],
  };

  $selArr.forEach((itm) => {
    let $options = $(itm.sel).getElementsByTagName("option");
    let $opt = Array.from($options).find(
      (jtm) => jtm.value.toLowerCase() === itm.type.toLowerCase()
    );
    $opt.selected = true;
  });

  const getupdateKohObj = () => {
    return setchangeObj;
  };

  const getSocialStatus = () => {
    let bool = false;
      document.querySelectorAll(".inp-social").forEach((inp) => {
        if (inp.value !== "") {
          bool = true;
        }
      });
    return bool;
  };

  socialinp.forEach((inp) => {
    inp.addEventListener("blur", (evt) => {
      var $target = evt.currentTarget;
      if ($target.value !== "") {
        let type = $target.id.replace("inp_", "");
        type = setchangeObj.social.find((jtm) => jtm.name == type);
        type["val"] = $target.value;
      }
    });
  });

  blurItms.forEach((inp) => {
    inp.addEventListener("blur", (evt) => {
      let bool = evt.currentTarget.value !== "" ? true : false;
      let type = evt.currentTarget.dataset.type;
      if (bool) {
        $("chx_" + type).classList.add("active");
        return;
      }
      if (!bool && type !== "social") {
        $("chx_" + type).classList.remove("active");
        return;
      }

      getSocialStatus()
        ? $("chx_" + type).classList.add("active")
        : $("chx_" + type).classList.remove("active");
      return;
    });
  });

  dropdowns.forEach((drop) => {
    drop.addEventListener("change", (evt) => {
      let $type = drop.id.replace("sel_", "");
      if (drop.value !== setchangeObj[$type]) {
        setchangeObj[$type] = drop.value;
        updateChange = true;
      }
    });
  });

  radios.forEach((rad) => {
    rad.addEventListener("click", (evt) => {
      setchangeObj.gender = evt.target.value;
    });
  });
  const getOpenStatus = (status) => {
    let bool = status;
    return bool;
  };

  linkAccordians.forEach((_link) => {
    _link.addEventListener("click", (evt) => {
      evt.preventDefault();
      let $type = evt.currentTarget.dataset.type;

      if ($("li_" + $type).classList.contains("open")) {
        $("li_" + $type).classList.remove("open");
        return;
      }

      linkContent.forEach((itm) => itm.classList.remove("open"));

      $("li_" + $type).classList.add("open");

      return false;
    });
  });

  $("textarea_notes").addEventListener("blur", (evt) => {
    var $val = evt.currentTarget.value;
    setchangeObj["notes"] = $val !== "" || $val !== null ? $val : null;
  });


  const updatekfunct = async (_data) =>{
    const url = "/updatekoh";   

    await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": document.forms[0].csrfmiddlewaretoken.value
        },
        body: JSON.stringify(_data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  $("btn_changes").addEventListener("click", (evt) => {
    evt.preventDefault();
        updatekfunct(getupdateKohObj());
    return false;
  });
  const resetModal = () => {
    return true;
  };

  $("close_modal").addEventListener("click", (evt) => {
    evt.preventDefault();
    if (resetModal()) $("body").classList.remove("loggedIn");
    return false;
  });
})();

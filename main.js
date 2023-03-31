const $ = (arg) => {
  // DOMContentLoaded
  if (typeof arg === "function") {
    document.addEventListener("DOMContentLoaded", arg);
    return;
  }

  let elements = arg;

  if (typeof arg === "string") {
    elements = document.querySelectorAll(arg);
  }

  if (arg instanceof HTMLElement) {
    elements = [arg];
  }

  // Selector CSS
  elements.css = (...args) => {
    const [property, value] = args;
    const isString = typeof property === "string";
    elements.forEach((el) => {
      if (isString) {
        el.style[property] = value;
      } else {
        const entriesCSS = Object.entries(property);
        entriesCSS.forEach(([property, value]) => {
          el.style[property] = value;
        });
      }
    });

    return elements;
  };

  // Eventos
  elements.on = (...args) => {
    const [event, callBack] = args;
    elements.forEach((el) => {
      el.addEventListener(event, callBack);
    });
    return elements;
  };

  // Each
  elements.each = (fn) => {
    elements.forEach((el, i) => {
      fn(i, el);
    });
    return elements;
  };

  // Fade In
  elements.fadeIn = (duration = 1000) => {
    elements.forEach((el, i) => {
      const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration,
      });
      animation.onfinish = () => (el.style.opacity = 1);
    });
    return elements;
  };

  return elements;
};

// Testing

$(() => {
  $("button")
    .css("background", "#09f")
    .css("border", "#fff")
    .css({
      padding: "16px",
      borderRadius: "4px",
    })
    .on("click", () => {
      $("#mensaje").fadeIn();
    });

  $("li").each((i, el) => {
    switch (i) {
      case 0:
        $(el).css("color", "#09f");
        break;
      case 1:
        $(el).css("color", "red");
        break;
      case 2:
        $(el).css("color", "green");
        break;
      default:
        break;
    }
  });
});

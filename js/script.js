(function () {
  const form = document.querySelector("#booking-form");

  function validate() {
    let result = true;
    form.querySelectorAll("input").forEach((input) => {
      input.classList.remove("field-error");
    });

    form.querySelectorAll(".field-group").forEach((group) => {
      // проверка телефона
      if (group.classList.contains("phones-group")) {
        const input = group.querySelector("#phone");
        const regex = /^\+7[\(\)\-\s]*([\d][\(\)\-\s]*){10}$/;
        const isValid = regex.test(input.value);

        if (isValid) {
          input.classList.add("field-correct");
        } else {
          input.classList.add("field-error");
          result = false;
        }
      }

      // проверка даты
      if (group.classList.contains("dates-group")) {
        const checkinInput = document.getElementById("checkin-date");
        const checkoutInput = document.getElementById("checkout-date");
        const regex = /^(\d{4}[.-]\d{2}[.-]\d{2}|\d{2}[.-]\d{2}[.-]\d{4})$/;
        const checkinDateValid = regex.test(checkinInput.value);
        const checkoutDateValid = regex.test(checkoutInput.value);
        let isDateDifferenceValid = false;

        // Если формат дат верен, проверим разницу в датах
        if (checkinDateValid && checkoutDateValid) {
          // Преобразуем строки в объекты Date в формат ГГГГ-ММ-ДД
          const checkinDate = new Date(
            checkinInput.value.replace(
              /^(\d{2})\.(\d{2})\.(\d{4})$/,
              "$3-$2-$1"
            )
          );
          const checkoutDate = new Date(
            checkoutInput.value.replace(
              /^(\d{2})\.(\d{2})\.(\d{4})$/,
              "$3-$2-$1"
            )
          );
          const dateDifference = (checkoutDate - checkinDate) / 86400000;
          // Проверяем, что разница в датах составляет не менее 4 дней
          if (dateDifference >= 4) {
            isDateDifferenceValid = true;
          }
        }

        if (checkinDateValid && checkoutDateValid && isDateDifferenceValid) {
          checkinInput.classList.add("field-correct");
          checkoutInput.classList.add("field-correct");
        } else {
          checkinInput.classList.add("field-error");
          checkoutInput.classList.add("field-error");
          result = false;
        }
      }

      // проверка номеров
      if (group.classList.contains("guests-group")) {
        const adultsInput = group.querySelector("#adults");
        const childrenInput = group.querySelector("#children");

        const isAdultsValid = Number(adultsInput.value) >= 1;
        const isChildrenValid =
          Number(childrenInput.value) <= Number(adultsInput.value);
        let isChekedValid = false;

        if (isAdultsValid && isChildrenValid) {
          const chekedInput = group.querySelector(
            'input[name="room-type"]:checked'
          );

          switch (chekedInput.value) {
            case "single": {
              isChekedValid = Number(adultsInput.value) <= 1;
              break;
            }
            case "family": {
              isChekedValid =
                Number(adultsInput.value) >= 2 &&
                Number(childrenInput.value) >= 1;
              break;
            }
          }
        }

        if (isAdultsValid && isChildrenValid && isChekedValid) {
          adultsInput.classList.add("field-correct");
          childrenInput.classList.add("field-correct");
        } else {
          adultsInput.classList.add("field-error");
          childrenInput.classList.add("field-error");
          result = false;
        }
      }
    });

    return result;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validate();
    // if (validate() === true) {
    // }
  });
})();

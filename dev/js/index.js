"use strict";

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[popupOpen]').forEach(function (e) {
    e.addEventListener('click', function (e) {
      popupClose();
      var target = e.target.getAttribute('popupOpen');
      popupOpen(target);
    });
  });
  document.querySelectorAll('[popupClose_JS]').forEach(function (e) {
    e.addEventListener('click', function (e) {
      popupClose();
    });
  });
  function popupClose() {
    document.querySelectorAll('.popup.open input').forEach(function (input) {
      input.value = '';
    });
    document.querySelectorAll('.popup.open textarea').forEach(function (textarea) {
      textarea.value = '';
    });
    document.querySelector('html').removeAttribute('style');
    if (document.querySelector('.popup.open')) {
      document.querySelector('.popup.open').classList.remove('open');
    }
  }
  ;
  function popupOpen(e) {
    popupClose();
    var target = e;
    var width = document.body.clientWidth;
    document.querySelector('html').style.cssText = 'overflow: hidden;';
    document.querySelector('[popupID="' + target + '"]').classList.add('open');
  }
  ;
  var passwordField = document.getElementById('password');
  var toggleButton = document.getElementById('toggleVisibility');

  // Функция для обновления отображения пароля
  function updatePasswordMask() {
    var value = passwordField.value;
    var maskedValue = value.split('').map(function (_char, index) {
      if (index > 0 && index < value.length - 1) {
        return '•';
      }
      return _char;
    }).join('');
    passwordField.setAttribute('data-masked', maskedValue);
  }
  if (passwordField) {
    // Инициализация маски для пароля
    var im = new Inputmask({
      mask: '*{1,20}',
      // Маска для пароля (до 20 символов)
      placeholder: '',
      // Плейсхолдер
      showMaskOnHover: false,
      // Не показывать маску при наведении
      showMaskOnFocus: false // Не показывать маску при фокусе
    });
    im.mask(passwordField);

    // Обновление маски при вводе
    passwordField.addEventListener('input', updatePasswordMask);
    // Переключение видимости пароля
    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      if (type === 'password') {
        updatePasswordMask();
      } else {
        passwordField.setAttribute('data-masked', passwordField.value);
      }
    });
    // Изначально обновить маску
    updatePasswordMask();
  }
  if (document.querySelector('.form-login')) {
    document.querySelector('.form-login').addEventListener('submit', function (e) {
      e.preventDefault();
      var inputs = Array.from(e.target.querySelectorAll('input'));
      if (inputs.some(function (input) {
        return !input.value;
      })) {
        inputs.filter(function (input) {
          return !input.value;
        }).forEach(function (item) {
          item.style.borderColor = '#e30513';
          setTimeout(function () {
            inputs.forEach(function (input) {
              input.removeAttribute('style');
            });
          }, 1000);
        });
        return;
      } else {
        location.href = 'cabinet.html';
      }
    });
  }
  document.querySelectorAll('select').forEach(function (select) {
    new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
      removeItemButton: false,
      shouldSort: false
    });
  });
  function scrollStart() {
    var tableContainer = document.querySelector('.table-wrap');
    if (tableContainer) {
      // Устанавливаем горизонтальную прокрутку в начальное положение
      tableContainer.scrollLeft = tableContainer.scrollWidth;
    }
  }
  scrollStart();
  if (document.querySelector('.section-main__container')) {
    var content = document.querySelector('.section-main__container').innerHTML;
    var changeLayout = "<div class=\"section-main__imges\">\n    <div class=\"section-main__img-wrap\">\n      <img src=\"img/grafic.webp\" alt=\"\" class=\"section-main__img\">\n    </div>\n    <div class=\"section-main__img-wrap\">\n      <img src=\"img/table.webp\" alt=\"\" class=\"section-main__img\">\n    </div>\n  </div>\n  <div class=\"table-wrap\">\n    <table>\n      <thead>\n          <tr>\n              <th>\u2116</th>\n              <th>\u0420\u0435\u0433\u0438\u043E\u043D</th>\n              <th>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043F\u0442\u0435\u043A\u0438</th>\n              <th>\u0410\u0434\u0440\u0435\u0441 \u0430\u043F\u0442\u0435\u043A\u0438</th>\n              <th>\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0439 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</th>\n              <th>\u041E\u0431\u0449\u0435\u0435 \u043A\u043E\u043B-\u0432\u043E \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439</th>\n          </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>1</td>\n          <td>\u0412\u043E\u043B\u043E\u0433\u043E\u0434\u0441\u043A\u0430\u044F \u043E\u0431\u043B\u0430\u0441\u0442\u044C</td>\n          <td><button class=\"table-btn\" popupOpen=\"apteka\">\u0410\u043F\u0442\u0435\u043A\u0430 1</button></td>\n          <td>\u041B\u043E\u043C\u043E\u043D\u043E\u0441\u043E\u0432\u0430 30</td>\n          <td>5/25/2025</td>\n          <td>45</td>\n        </tr>\n        </tbody>\n        </table>\n        </div>";
    var searchInput = document.querySelector('.form-input_search');
    var searchForm = document.querySelector('.search-form');
    if (searchForm && searchInput) {
      searchInput.addEventListener('input', function () {
        if (searchInput.value) {
          document.querySelector('.search-form__clean-btn').classList.add('show');
        } else {
          document.querySelector('.search-form__clean-btn').classList.remove('show');
        }
      });
      document.querySelector('.search-form__clean-btn').addEventListener('click', function (e) {
        searchInput.value = '';
        e.target.classList.remove('show');
        searchInput.focus();
        // document.querySelector('.section-main__container').innerHTML = content;
      });
    }
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!searchInput.value) {
        document.querySelector('.section-main__container').innerHTML = content;
        document.querySelectorAll('[popupOpen]').forEach(function (e) {
          e.addEventListener('click', function (e) {
            popupClose();
            var target = e.target.getAttribute('popupOpen');
            popupOpen(target);
          });
        });
        scrollStart();
        document.querySelector('.section-main__container').scrollIntoView({
          behavior: 'smooth'
        });
        return;
      } else {
        document.querySelector('.section-main__container').innerHTML = changeLayout;
        document.querySelectorAll('[popupOpen]').forEach(function (e) {
          e.addEventListener('click', function (e) {
            popupClose();
            var target = e.target.getAttribute('popupOpen');
            popupOpen(target);
          });
        });
        scrollStart();
        document.querySelector('.section-main__container').scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImUiLCJwb3B1cENsb3NlIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicG9wdXBPcGVuIiwiaW5wdXQiLCJ2YWx1ZSIsInRleHRhcmVhIiwicXVlcnlTZWxlY3RvciIsInJlbW92ZUF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsIndpZHRoIiwiYm9keSIsImNsaWVudFdpZHRoIiwic3R5bGUiLCJjc3NUZXh0IiwiYWRkIiwicGFzc3dvcmRGaWVsZCIsImdldEVsZW1lbnRCeUlkIiwidG9nZ2xlQnV0dG9uIiwidXBkYXRlUGFzc3dvcmRNYXNrIiwibWFza2VkVmFsdWUiLCJzcGxpdCIsIm1hcCIsImNoYXIiLCJpbmRleCIsImxlbmd0aCIsImpvaW4iLCJzZXRBdHRyaWJ1dGUiLCJpbSIsIklucHV0bWFzayIsIm1hc2siLCJwbGFjZWhvbGRlciIsInNob3dNYXNrT25Ib3ZlciIsInNob3dNYXNrT25Gb2N1cyIsInByZXZlbnREZWZhdWx0IiwidHlwZSIsImlucHV0cyIsIkFycmF5IiwiZnJvbSIsInNvbWUiLCJmaWx0ZXIiLCJpdGVtIiwiYm9yZGVyQ29sb3IiLCJzZXRUaW1lb3V0IiwibG9jYXRpb24iLCJocmVmIiwic2VsZWN0IiwiQ2hvaWNlcyIsInNlYXJjaEVuYWJsZWQiLCJpdGVtU2VsZWN0VGV4dCIsInBvc2l0aW9uIiwicmVtb3ZlSXRlbUJ1dHRvbiIsInNob3VsZFNvcnQiLCJzY3JvbGxTdGFydCIsInRhYmxlQ29udGFpbmVyIiwic2Nyb2xsTGVmdCIsInNjcm9sbFdpZHRoIiwiY29udGVudCIsImlubmVySFRNTCIsImNoYW5nZUxheW91dCIsInNlYXJjaElucHV0Iiwic2VhcmNoRm9ybSIsImZvY3VzIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciJdLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3BvcHVwT3Blbl0nKS5mb3JFYWNoKChlKSA9PiB7XG4gICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBwb3B1cENsb3NlKCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdwb3B1cE9wZW4nKTtcbiAgICAgIHBvcHVwT3Blbih0YXJnZXQpO1xuICAgIH0pO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3BvcHVwQ2xvc2VfSlNdJykuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgcG9wdXBDbG9zZSgpO1xuICAgIH0pO1xuICB9KTtcbiAgZnVuY3Rpb24gcG9wdXBDbG9zZSAoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwLm9wZW4gaW5wdXQnKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICB9KTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAub3BlbiB0ZXh0YXJlYScpLmZvckVhY2goKHRleHRhcmVhKSA9PiB7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLm9wZW4nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLm9wZW4nKS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHBvcHVwT3BlbiAoZSkge1xuICAgIHBvcHVwQ2xvc2UoKTtcbiAgICB2YXIgdGFyZ2V0ID0gZTtcbiAgICB2YXIgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLnN0eWxlLmNzc1RleHQgPSAnb3ZlcmZsb3c6IGhpZGRlbjsnO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1twb3B1cElEPVwiJyArIHRhcmdldCArICdcIl0nKS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gIH07XG5cblxuXG4gIHZhciBwYXNzd29yZEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJyk7XG4gIHZhciB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlVmlzaWJpbGl0eScpO1xuXG4gIC8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQvtCx0L3QvtCy0LvQtdC90LjRjyDQvtGC0L7QsdGA0LDQttC10L3QuNGPINC/0LDRgNC+0LvRj1xuICBmdW5jdGlvbiB1cGRhdGVQYXNzd29yZE1hc2soKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXNzd29yZEZpZWxkLnZhbHVlO1xuICAgICAgdmFyIG1hc2tlZFZhbHVlID0gdmFsdWUuc3BsaXQoJycpLm1hcCgoY2hhciwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPiAwICYmIGluZGV4IDwgdmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ+KAoic7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjaGFyO1xuICAgICAgfSkuam9pbignJyk7XG4gICAgICBwYXNzd29yZEZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1tYXNrZWQnLCBtYXNrZWRWYWx1ZSk7XG4gIH1cbiAgaWYocGFzc3dvcmRGaWVsZCkge1xuICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvNCw0YHQutC4INC00LvRjyDQv9Cw0YDQvtC70Y9cbiAgICB2YXIgaW0gPSBuZXcgSW5wdXRtYXNrKHtcbiAgICAgIG1hc2s6ICcqezEsMjB9JywgLy8g0JzQsNGB0LrQsCDQtNC70Y8g0L/QsNGA0L7Qu9GPICjQtNC+IDIwINGB0LjQvNCy0L7Qu9C+0LIpXG4gICAgICBwbGFjZWhvbGRlcjogJycsIC8vINCf0LvQtdC50YHRhdC+0LvQtNC10YBcbiAgICAgIHNob3dNYXNrT25Ib3ZlcjogZmFsc2UsIC8vINCd0LUg0L/QvtC60LDQt9GL0LLQsNGC0Ywg0LzQsNGB0LrRgyDQv9GA0Lgg0L3QsNCy0LXQtNC10L3QuNC4XG4gICAgICBzaG93TWFza09uRm9jdXM6IGZhbHNlIC8vINCd0LUg0L/QvtC60LDQt9GL0LLQsNGC0Ywg0LzQsNGB0LrRgyDQv9GA0Lgg0YTQvtC60YPRgdC1XG4gICAgfSk7XG4gICAgaW0ubWFzayhwYXNzd29yZEZpZWxkKTtcblxuICAgIC8vINCe0LHQvdC+0LLQu9C10L3QuNC1INC80LDRgdC60Lgg0L/RgNC4INCy0LLQvtC00LVcbiAgICBwYXNzd29yZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlUGFzc3dvcmRNYXNrKTtcbiAgICAvLyDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LLQuNC00LjQvNC+0YHRgtC4INC/0LDRgNC+0LvRj1xuICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgdHlwZSA9IHBhc3N3b3JkRmllbGQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdwYXNzd29yZCcgPyAndGV4dCcgOiAncGFzc3dvcmQnO1xuICAgICAgcGFzc3dvcmRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0eXBlKTtcbiAgICAgIGlmICh0eXBlID09PSAncGFzc3dvcmQnKSB7XG4gICAgICAgICAgdXBkYXRlUGFzc3dvcmRNYXNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhc3N3b3JkRmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLW1hc2tlZCcsIHBhc3N3b3JkRmllbGQudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vINCY0LfQvdCw0YfQsNC70YzQvdC+INC+0LHQvdC+0LLQuNGC0Ywg0LzQsNGB0LrRg1xuICAgIHVwZGF0ZVBhc3N3b3JkTWFzaygpO1xuICB9XG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWxvZ2luJykpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1sb2dpbicpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgaW5wdXRzID0gQXJyYXkuZnJvbShlLnRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKTtcbiAgICAgIGlmKGlucHV0cy5zb21lKChpbnB1dCA9PiAhaW5wdXQudmFsdWUpKSkge1xuICAgICAgICBpbnB1dHMuZmlsdGVyKGlucHV0ID0+ICFpbnB1dC52YWx1ZSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2UzMDUxMyc7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJ2NhYmluZXQuaHRtbCc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpLmZvckVhY2goKHNlbGVjdCkgPT4ge1xuICAgIG5ldyBDaG9pY2VzKHNlbGVjdCwge1xuICAgICAgc2VhcmNoRW5hYmxlZDogZmFsc2UsXG4gICAgICBpdGVtU2VsZWN0VGV4dDogJycsXG4gICAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gICAgICByZW1vdmVJdGVtQnV0dG9uOiBmYWxzZSxcbiAgICAgIHNob3VsZFNvcnQ6IGZhbHNlLFxuICAgIH0pO1xuICB9KTtcblxuICBmdW5jdGlvbiBzY3JvbGxTdGFydCgpIHtcbiAgICB2YXIgdGFibGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUtd3JhcCcpO1xuICAgIGlmKHRhYmxlQ29udGFpbmVyKSB7XG4gICAgICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LPQvtGA0LjQt9C+0L3RgtCw0LvRjNC90YPRjiDQv9GA0L7QutGA0YPRgtC60YMg0LIg0L3QsNGH0LDQu9GM0L3QvtC1INC/0L7Qu9C+0LbQtdC90LjQtVxuICAgICAgIHRhYmxlQ29udGFpbmVyLnNjcm9sbExlZnQgPSB0YWJsZUNvbnRhaW5lci5zY3JvbGxXaWR0aDtcbiAgICB9XG4gIH1cbiAgc2Nyb2xsU3RhcnQoKTtcblxuXG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpLmlubmVySFRNTDtcbiAgICBjb25zdCBjaGFuZ2VMYXlvdXQgPSBgPGRpdiBjbGFzcz1cInNlY3Rpb24tbWFpbl9faW1nZXNcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1tYWluX19pbWctd3JhcFwiPlxuICAgICAgPGltZyBzcmM9XCJpbWcvZ3JhZmljLndlYnBcIiBhbHQ9XCJcIiBjbGFzcz1cInNlY3Rpb24tbWFpbl9faW1nXCI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tbWFpbl9faW1nLXdyYXBcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL3RhYmxlLndlYnBcIiBhbHQ9XCJcIiBjbGFzcz1cInNlY3Rpb24tbWFpbl9faW1nXCI+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidGFibGUtd3JhcFwiPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD7ihJY8L3RoPlxuICAgICAgICAgICAgICA8dGg+0KDQtdCz0LjQvtC9PC90aD5cbiAgICAgICAgICAgICAgPHRoPtCd0LDQt9Cy0LDQvdC40LUg0LDQv9GC0LXQutC4PC90aD5cbiAgICAgICAgICAgICAgPHRoPtCQ0LTRgNC10YEg0LDQv9GC0LXQutC4PC90aD5cbiAgICAgICAgICAgICAgPHRoPtCU0LDRgtCwINC/0L7RgdC70LXQtNC90LXQuSDRhNC+0YLQvtCz0YDQsNGE0LjQuDwvdGg+XG4gICAgICAgICAgICAgIDx0aD7QntCx0YnQtdC1INC60L7Quy3QstC+INGE0L7RgtC+0LPRgNCw0YTQuNC5PC90aD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0ZD4xPC90ZD5cbiAgICAgICAgICA8dGQ+0JLQvtC70L7Qs9C+0LTRgdC60LDRjyDQvtCx0LvQsNGB0YLRjDwvdGQ+XG4gICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XCJ0YWJsZS1idG5cIiBwb3B1cE9wZW49XCJhcHRla2FcIj7QkNC/0YLQtdC60LAgMTwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgPHRkPtCb0L7QvNC+0L3QvtGB0L7QstCwIDMwPC90ZD5cbiAgICAgICAgICA8dGQ+NS8yNS8yMDI1PC90ZD5cbiAgICAgICAgICA8dGQ+NDU8L3RkPlxuICAgICAgICA8L3RyPlxuICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5gO1xuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0taW5wdXRfc2VhcmNoJyk7XG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybScpO1xuICAgIGlmKHNlYXJjaEZvcm0gJiYgc2VhcmNoSW5wdXQpIHtcbiAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICBpZihzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybV9fY2xlYW4tYnRuJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybV9fY2xlYW4tYnRuJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybV9fY2xlYW4tYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIHNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYoIXNlYXJjaElucHV0LnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1twb3B1cE9wZW5dJykuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgcG9wdXBDbG9zZSgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgncG9wdXBPcGVuJyk7XG4gICAgICAgICAgICBwb3B1cE9wZW4odGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcm9sbFN0YXJ0KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi1tYWluX19jb250YWluZXInKS5pbm5lckhUTUwgPSBjaGFuZ2VMYXlvdXQ7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1twb3B1cE9wZW5dJykuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgcG9wdXBDbG9zZSgpO1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgncG9wdXBPcGVuJyk7XG4gICAgICAgICAgICBwb3B1cE9wZW4odGFyZ2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcm9sbFN0YXJ0KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLW1haW5fX2NvbnRhaW5lcicpLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59KTtcblxuXG4iXSwibWFwcGluZ3MiOiI7O0FBQUFBLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUN2REQsUUFBUSxDQUFDRSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLENBQUMsRUFBSztJQUN0REEsQ0FBQyxDQUFDSCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0csQ0FBQyxFQUFLO01BQ2pDQyxVQUFVLENBQUMsQ0FBQztNQUNaLElBQUlDLE1BQU0sR0FBR0YsQ0FBQyxDQUFDRSxNQUFNLENBQUNDLFlBQVksQ0FBQyxXQUFXLENBQUM7TUFDL0NDLFNBQVMsQ0FBQ0YsTUFBTSxDQUFDO0lBQ25CLENBQUMsQ0FBQztFQUNKLENBQUMsQ0FBQztFQUNGTixRQUFRLENBQUNFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDQyxDQUFDLEVBQUs7SUFDMURBLENBQUMsQ0FBQ0gsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNHLENBQUMsRUFBSztNQUNqQ0MsVUFBVSxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUM7RUFDSixDQUFDLENBQUM7RUFDRixTQUFTQSxVQUFVQSxDQUFBLEVBQUk7SUFDckJMLFFBQVEsQ0FBQ0UsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNNLEtBQUssRUFBSztNQUNoRUEsS0FBSyxDQUFDQyxLQUFLLEdBQUcsRUFBRTtJQUNsQixDQUFDLENBQUM7SUFDRlYsUUFBUSxDQUFDRSxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDQyxPQUFPLENBQUMsVUFBQ1EsUUFBUSxFQUFLO01BQ3RFQSxRQUFRLENBQUNELEtBQUssR0FBRyxFQUFFO0lBQ3JCLENBQUMsQ0FBQztJQUNGVixRQUFRLENBQUNZLGFBQWEsQ0FBQyxN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

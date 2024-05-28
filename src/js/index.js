document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[popupOpen]').forEach((e) => {
    e.addEventListener('click', (e) => {
      popupClose();
      var target = e.target.getAttribute('popupOpen');
      popupOpen(target);
    });
  });
  document.querySelectorAll('[popupClose_JS]').forEach((e) => {
    e.addEventListener('click', (e) => {
      popupClose();
    });
  });
  function popupClose () {
    document.querySelectorAll('.popup.open input').forEach((input) => {
      input.value = '';
    });
    document.querySelectorAll('.popup.open textarea').forEach((textarea) => {
      textarea.value = '';
    });
    document.querySelector('html').removeAttribute('style');
    if(document.querySelector('.popup.open')) {
      document.querySelector('.popup.open').classList.remove('open');
    }
  };

  function popupOpen (e) {
    popupClose();
    var target = e;
    var width = document.body.clientWidth;

    document.querySelector('html').style.cssText = 'overflow: hidden;';
    document.querySelector('[popupID="' + target + '"]').classList.add('open');
  };



  var passwordField = document.getElementById('password');
  var toggleButton = document.getElementById('toggleVisibility');

  // Функция для обновления отображения пароля
  function updatePasswordMask() {
      var value = passwordField.value;
      var maskedValue = value.split('').map((char, index) => {
          if (index > 0 && index < value.length - 1) {
              return '•';
          }
          return char;
      }).join('');
      passwordField.setAttribute('data-masked', maskedValue);
  }
  if(passwordField) {
  // Инициализация маски для пароля
    var im = new Inputmask({
      mask: '*{1,20}', // Маска для пароля (до 20 символов)
      placeholder: '', // Плейсхолдер
      showMaskOnHover: false, // Не показывать маску при наведении
      showMaskOnFocus: false // Не показывать маску при фокусе
    });
    im.mask(passwordField);

    // Обновление маски при вводе
    passwordField.addEventListener('input', updatePasswordMask);
    // Переключение видимости пароля
    toggleButton.addEventListener('click', (e) => {
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
  if(document.querySelector('.form-login')) {
    document.querySelector('.form-login').addEventListener('submit', (e) => {
      e.preventDefault();
      let inputs = Array.from(e.target.querySelectorAll('input'));
      if(inputs.some((input => !input.value))) {
        inputs.filter(input => !input.value).forEach((item) => {
          item.style.borderColor = '#e30513';
          setTimeout(function(){
            inputs.forEach((input) => {
              input.removeAttribute('style');
            })
          }, 1000);
        });
        return;
      } else {
        location.href = 'cabinet.html';
      }
    });
  }


  document.querySelectorAll('select').forEach((select) => {
    new Choices(select, {
      searchEnabled: false,
      itemSelectText: '',
      position: 'bottom',
      removeItemButton: false,
      shouldSort: false,
    });
  });

  function scrollStart() {
    var tableContainer = document.querySelector('.table-wrap');
    if(tableContainer) {
       // Устанавливаем горизонтальную прокрутку в начальное положение
       tableContainer.scrollLeft = tableContainer.scrollWidth;
    }
  }
  scrollStart();


  if(document.querySelector('.section-main__container')) {
    const content = document.querySelector('.section-main__container').innerHTML;
    const changeLayout = `<div class="section-main__imges">
    <div class="section-main__img-wrap">
      <img src="img/grafic.webp" alt="" class="section-main__img">
    </div>
    <div class="section-main__img-wrap">
      <img src="img/table.webp" alt="" class="section-main__img">
    </div>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
          <tr>
              <th>№</th>
              <th>Регион</th>
              <th>Название аптеки</th>
              <th>Адрес аптеки</th>
              <th>Дата последней фотографии</th>
              <th>Общее кол-во фотографий</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Вологодская область</td>
          <td><button class="table-btn" popupOpen="apteka">Аптека 1</button></td>
          <td>Ломоносова 30</td>
          <td>5/25/2025</td>
          <td>45</td>
        </tr>
        </tbody>
        </table>
        </div>`;
    const searchInput = document.querySelector('.form-input_search');
    const searchForm = document.querySelector('.search-form');
    if(searchForm && searchInput) {
      searchInput.addEventListener('input', () => {
        if(searchInput.value) {
          document.querySelector('.search-form__clean-btn').classList.add('show');
        } else {
          document.querySelector('.search-form__clean-btn').classList.remove('show');
        }
      });
      document.querySelector('.search-form__clean-btn').addEventListener('click', (e) => {
        searchInput.value = '';
        e.target.classList.remove('show');
        searchInput.focus();
        // document.querySelector('.section-main__container').innerHTML = content;
      });
    }
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!searchInput.value) {
        document.querySelector('.section-main__container').innerHTML = content;
        document.querySelectorAll('[popupOpen]').forEach((e) => {
          e.addEventListener('click', (e) => {
            popupClose();
            var target = e.target.getAttribute('popupOpen');
            popupOpen(target);
          });
        });
        scrollStart();
        document.querySelector('.section-main__container').scrollIntoView({ behavior: 'smooth' });
        return;
      } else {
        document.querySelector('.section-main__container').innerHTML = changeLayout;
        document.querySelectorAll('[popupOpen]').forEach((e) => {
          e.addEventListener('click', (e) => {
            popupClose();
            var target = e.target.getAttribute('popupOpen');
            popupOpen(target);
          });
        });
        scrollStart();
        document.querySelector('.section-main__container').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});



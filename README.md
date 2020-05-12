# Emails-editor
Ссылка: https://k1-256.github.io/Emails-input/

# Usage
1) Скачать и разместить на html странице emails-input.css и emails-input.js
2) Разместить div на странице с уникальным id или классом
3) Создать новый класс EmailsInput с селектором созданного div
4) Если необходимо подписаться на события изменения email, то используем для экземпляра класса метод onChange
5) Есть возможность вставлять список emails через запятую из буфера обмена, для этого нужно нажать Enter, запятую или потерять фокус

# Example
```html
<div class="form form_first">
        <div class="form__header">
            <div class="form__header-name">
                <span>Share <b>Board name</b> with others</span>
            </div>
            
            <div id="emails-input"></div>
        </div>
        <div class="form__footer">
            <button id="add" onclick="emailsInput.randomEmail()">Add email</button>
            <button id="get" onclick="emailsInput.getEmailsCount()">Get emails count</button>
        </div>

        <script>
            var inputContainerNode = document.querySelector('#emails-input');
            var emailsInput = new EmailsInput(inputContainerNode);
            
            emailsInput.onChange(function(e){
                console.log('changeEmail');
            })
        </script>
    </div>
```

# API

  - emailsInput.randomEmail() - генерирует случайный email
  - emailsInput.getEmailsCount() - Возвращает количество валидных emails в alert-е
  - emailsInput.onChange(Callback) - Подписаться на события
  - emailsInput.getAllEmails() - Возвращает объект с массивами валидных и невалидных emails
  - emailsInput.replaceEmails(str) - Заменяет текущие блоки с emails на те, которые переданы в str, где str вида 'ivan@mail.ru, max@mail.ru'

"use strict";

function EmailsInput(node) {
    if (!node) return;
    this.node = node;
    this.node.classList.add('comp_emails-input');
    var that = this;
    this.node.onclick = function(e) {
        if (e.target === this) that._showInput();
    }
    this._addInput();

    this._onChange = function () {}

    this.onChange = function (callback) {
		this._onChange = callback;
	}

}

EmailsInput.prototype._addInput = function() {
    var that = this;
    var input = document.createElement('input');
    input.classList.add('comp_placeholder');
    input.setAttribute('placeholder', 'add more people…');
    this.node.appendChild(input);

    input.onblur = function () {
        that._currentEmail = this.value;
        that._addEmail();
        
    }
    this.input = input;
}

EmailsInput.prototype._showInput = function() {
    var input = this.input;
    var that = this;
    input.focus();

    input.onkeypress = function(event) {
        if (event.which === 44 || event.keyCode === 32 || event.keyCode === 13) {
            event.preventDefault();
            
            if (input.value.indexOf(',') === -1) {
                that._currentEmail = input.value;
                that._addEmail();
            } else {
                var buffer = input.value;
                buffer.split(',').forEach(function(curEl) {
                    that._currentEmail = curEl.trim();
                    that._addEmail();
                })
            }
            
            
        }
    }
    
}

EmailsInput.prototype._addEmail = function() {
    if (!this._currentEmail) return;
    var that = this;
    var reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = reg.test(this._currentEmail);


    var delHTML = document.createElement('i');
    delHTML.classList.add('comp_del');
    delHTML.onclick = function(e) {
        var emailBlockHTML = e.target.parentNode;
        emailBlockHTML.parentNode.removeChild(emailBlockHTML);
        that._onChange();
    }

    var emailHTML = document.createElement('div');
    emailHTML.classList.add('comp_block-mail');
    emailHTML.textContent = this._currentEmail;
    emailHTML.appendChild(delHTML);

    if (valid) {
        emailHTML.classList.add('comp_valid-mail');
    } else {
        emailHTML.classList.add('comp_invalid-mail');
    }
    this.node.insertBefore(emailHTML, this.input);

    this._onChange();

    this.input.value = null;
    this._currentEmail = null;
}

EmailsInput.prototype.randomEmail = function() {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var randomEmail = '';
    while (randomEmail.length < Math.floor(Math.random() * 6 + 3)) {
        randomEmail += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    randomEmail += '@mail.ru';
    
    this._currentEmail = randomEmail;
    this._addEmail();
}

EmailsInput.prototype.getEmailsCount = function() {
    var validCount = this.node.querySelectorAll('.comp_valid-mail').length;
    alert('Number of correct emails: ' + validCount);
}

EmailsInput.prototype.getAllEmails = function() {
    var massValid = [];
    var massInvalid = [];
    var valid = this.node.querySelectorAll('.comp_valid-mail');
    for(var i=0; i<valid.length; i++) {
        massValid.push(valid[i].innerText);
    }
    var invalid = this.node.querySelectorAll('.comp_invalid-mail');
    for(var i=0; i<invalid.length; i++) {
        massInvalid.push(invalid[i].innerText);
    }
    return {
        valid: massValid,
        invalid: massInvalid
    }
}

EmailsInput.prototype.replaceEmails = function(emails) {
    var that = this;
    var elements = emailsInput.node.querySelectorAll('.comp_block-mail');
    if (elements.length === 0) return;
    for(var i=0; i<elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }

    emails.split(',').forEach(function(curEl) {
        that._currentEmail = curEl.trim();
        that._addEmail();
    })
}
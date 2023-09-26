import { LightningElement } from 'lwc';

export default class CustomerList extends LightningElement {
    name = '';
    surname = '';
    phone = '';
    email = '';
    showPhoneError = false;
    showEmailError = false;
    isAddButtonDisabled = true;
    customers = []; // Agregar esta línea para inicializar la matriz de registros

    handleNameChange(event) {
        this.name = event.target.value;
        this.validateAddButton();
    }

    handleSurnameChange(event) {
        this.surname = event.target.value;
        this.validateAddButton();
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
        this.validateAddButton();
        this.showPhoneError = !event.target.checkValidity();
        
    }
    isEmailValid(email) {
        return email.includes('@');
    }

    handleEmailChange(event) {
        this.email = event.target.value;
        this.validateAddButton();
        this.showEmailError = !event.target.checkValidity();

       
    }

    validateAddButton() {
        // Verificar si todos los campos están completos y no hay errores en la validación
        const isNameValid = this.name.trim() !== '';
        const isSurnameValid = this.surname.trim() !== '';
        const isPhoneValid = this.phone;
        const isEmailValid = this.email;

        // Habilitar el botón solo si todos los campos están completos
        this.isAddButtonDisabled = !(isNameValid && isSurnameValid && isPhoneValid && isEmailValid);
    }

    handleAddRecord() {
        // Evitar agregar un registro si el botón está deshabilitado
        if (this.isAddButtonDisabled) {
            return;
        }

        const customer = {
            name: this.name,
            surname: this.surname,
            phone: this.phone,
            email: this.email
        };

        this.customers = [...this.customers, customer];

        this.name = '';
        this.surname = '';
        this.phone = '';
        this.email = '';
        this.showPhoneError = false;
        this.showEmailError = false;

        this.isAddButtonDisabled = true;
    }
}

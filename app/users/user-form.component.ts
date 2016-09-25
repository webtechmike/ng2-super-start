import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/models/user';

@Component({
    selector: 'user-form',
    styles: [`
        form {
            padding: 10px;
            background: #ECF0F1;
            border-radius: 3px;
        }
        .has-error: { color: tomato; }
    `],
    template: `
        <form #form="ngForm" (ngSubmit)="onSubmit()" *ngIf="active">

            {{ form.valid }}

            <div class="form-group" [ngClass]="{ 'has-error': name.invalid && name.touched }">
                <input type="text" name="name" class="form-control" required [(ngModel)]="newUser.name" #name="ngModel" placeholder="Name">
                <span class="help-block" *ngIf="name.invalid && name.touched">Name is required.</span>
            </div>
            <div class="form-group" [ngClass]="{ 'has-error': username.invalid && username.touched }">
                <input type="text" name="username" class="form-control" required [(ngModel)]="newUser.username" #username="ngModel" placeholder="Username">
                <span class="help-block" *ngIf="username.invalid && username.touched">Username is required.</span>
            </div>
            <button type="submit" class="btn btn-block btn-primary" [disabled]="form.invalid">
                Create User
            </button>

        </form>
    `
})
export class UserFormComponent {
    @Output() userCreated = new EventEmitter();
    newUser: User = new User();
    active: boolean = true;

    onSubmit() {
        // show user created event
        this.userCreated.emit({ user: this.newUser });

        this.newUser = new User();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}

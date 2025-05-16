import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private firestore: Firestore) {}

  saveUser(uid: string, data: any) {
    const ref = doc(this.firestore, 'users', uid);
    return setDoc(ref, data);
  }
}

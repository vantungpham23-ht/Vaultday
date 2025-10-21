import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { AuthError, Session, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<Session | null>(null);
  public authChanges$ = this.authStateSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {
    // Initialize auth state
    this.supabaseService.client.auth.getSession().then(({ data: { session } }) => {
      this.authStateSubject.next(session);
    });

    // Listen for auth changes
    this.supabaseService.client.auth.onAuthStateChange((event, session) => {
      this.authStateSubject.next(session);
    });
  }

  async signInWithEmail(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
      email,
      password
    });

    return {
      user: data.user,
      error
    };
  }

  async signUpWithEmail(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password
    });

    return {
      user: data.user,
      error
    };
  }

  async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await this.supabaseService.client.auth.signOut();
    return { error };
  }

  async getSession(): Promise<Session | null> {
    const { data: { session } } = await this.supabaseService.client.auth.getSession();
    return session;
  }

  getCurrentUser(): Observable<User | null> {
    return this.authChanges$.pipe(
      map(session => session?.user || null)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.authChanges$.pipe(
      map(session => !!session)
    );
  }
}

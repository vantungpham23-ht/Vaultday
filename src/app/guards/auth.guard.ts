import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  // For now, always redirect to login for testing
  router.navigate(['/login']);
  return false;
};

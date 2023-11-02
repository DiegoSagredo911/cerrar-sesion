import React, { useState, useEffect } from 'react';

const InactivityPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [userActive, setUserActive] = useState(false);
  const [logoutRequested, setLogoutRequested] = useState(false);

  // Funcion para cerrar la sesion
  const logout = () => {
    //  lógica de cierre de sesión
    // y redirigir al usuario a la página de inicio de sesión.
    setLogoutRequested(true);
  };

  useEffect(() => {
    let inactivityTimer;
    let countdownTimer;

    // funcion reiniciar el temporizador de inactividad
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!logoutRequested) {
          setShowPopup(true);
        }
      }, 5 * 60 * 1000); // 5 minutos en milisegundos
    };

    // Comienza el temporizador de inactividad cuando el componente se instancia
    resetInactivityTimer();

    // Escucha eventos de actividad del usuario
    const activityEvents = ['mousemove', 'keydown', 'click'];

    const activityListener = () => {
      setUserActive(true);
      resetInactivityTimer();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, activityListener);
    });

    // Funcion para iniciar el temporizador de cuenta regresiva
    const startCountdown = () => {
      countdownTimer = setInterval(() => {
        if (!logoutRequested && countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(countdownTimer); // Detiene el temporizador cuando se solicita el cierre de sesion
          if (!logoutRequested) {
            logout();
          }
        }
      }, 1000);
    };

    // Comienza el temporizador de cuenta regresiva cuando se muestra el popup
    if (showPopup) {
      startCountdown();
    }

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownTimer);

      // Limpia los listeners de eventos de actividad
      activityEvents.forEach(event => {
        window.removeEventListener(event, activityListener);
      });
    };
  }, [showPopup, countdown, logoutRequested]);

  return (
    <div>
      {showPopup && (
        <div >
          <p>Tu sesión está a punto de expirar en {countdown} segundos.</p>
          <button onClick={() => setShowPopup(false)}>Mantener Activo</button>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default InactivityPopup;

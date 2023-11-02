import { Dialog, Transition } from '@headlessui/react';
import React, { useState, useEffect, Fragment } from 'react';

const InactivityPopup = ({timerInactivity, funcionClose}) => {
  const [showPopup, setShowPopup] = useState(false);
  //conteo de inactividad por defecto 120
  const [countdown, setCountdown] = useState(120);
  const [userActive, setUserActive] = useState(false);
  const [logoutRequested, setLogoutRequested] = useState(false);

  // Funcion para cerrar la sesion
  const logout = () => {
    funcionClose();
    setLogoutRequested(false);
    
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
      }, timerInactivity??5 *60* 1000); // 5 minutos en milisegundos
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

  function closeModal() {
    setCountdown(120);
    setShowPopup(false)
    
  }

  return (
    <>
    <div>
      {showPopup && (
        <div >
          <p>Tu sesión está a punto de expirar en {countdown} segundos.</p>
         
        </div>
      )}
    </div>

      <Transition appear show={showPopup} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Alerta
                  </Dialog.Title>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-black ">
                    Tu sesión está a punto de expirar en {countdown} segundos.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                  <button onClick={() => closeModal()} className="inline-flex justify-center rounded-md border-[2px] border-transparent bg-[#5E81AC] px-4 py-2 text-sm font-medium text-white hover:bg-[#81A1C1] focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2">Mantener Activo</button>
                  <button onClick={logout} className="inline-flex justify-center rounded-md borderborder-[2px]  border-transparent bg-[#5E81AC] px-4 py-2 text-sm font-medium text-white hover:bg-[#81A1C1] focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2">Cerrar Sesión</button>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    
    </>
    
  );
};

export default InactivityPopup;

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [logSuccess, setLogSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:8080/usuario/agregarUsuario", {
      method: "POST",
      body: JSON.stringify({
        usuario: data.usuario,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      console.log("Todo cool");
      setLogSuccess(true);
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Registrar</h2>
        <p>Porfavor introduce tus credenciales</p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Usuario"
            className={`input input-bordered input-primary w-full max-w-xs mt-1 ${
              errors.usuario && "input-error"
            }`}
            {...register("usuario", { required: true })}
          />
          {errors.usuario && (
            <span className="text-red-400">Usuario requerido</span>
          )}
          <input
            type="password"
            placeholder="Password"
            className={`input input-bordered input-primary w-full max-w-xs mt-4 ${
              errors.usuario && "input-error"
            }`}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-400">Contraseña requerida</span>
          )}
        </form>
        <div className="card-actions justify-end mt-2">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary btn-ghost"
          >
            Enviar
          </button>
          {logSuccess && (
            <div className="alert alert-success shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Usuario Registrado</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

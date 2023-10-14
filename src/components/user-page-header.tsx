import React from "react";

function UserPageHeader() {
  return (
    <div>
      <header className="flex flex-col items-center gap-3">
        <img
          className="w-[25%] aspect-square object-cover rounded-full"
          src="https://img.freepik.com/foto-gratis/mujer-hermosa-joven-mirando-camara-chica-moda-verano-casual-camiseta-blanca-pantalones-cortos-hembra-positiva-muestra-emociones-faciales-modelo-divertido-aislado-amarillo_158538-15796.jpg"
          alt=""
        />
        <h2>Username</h2>
        <div className="flex justify-between w-[75%]">
          <div className="text-center">
            <h3 className="text-sm font-semibold">Followers</h3>
            <p className="text-xs">23</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold">Post</h3>
            <p className="text-xs">23</p>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold">Following</h3>
            <p className="text-xs">23</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserPageHeader;

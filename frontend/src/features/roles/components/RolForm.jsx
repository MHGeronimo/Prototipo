// src/features/roles/components/RolForm.jsx
import React, { useState } from 'react';
import PermisosSelector from './PermisosSelector';

const RolForm = ({
  formData,
  onFormChange,
  permisosDisponibles, // Todavía recibimos la lista plana
  permisosAgrupados, // PERO AHORA TAMBIÉN LOS AGRUPADOS
  onToggleModulo,
  isEditing,
  isRoleAdmin,
  formErrors,
}) => {
  const [mostrarPermisos, setMostrarPermisos] = useState(isEditing || false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFormChange(name, type === 'checkbox' ? checked : value);
  };
  
  const handleToggleMostrarPermisos = () => {
    if (!isRoleAdmin) {
      setMostrarPermisos(prev => !prev);
    }
  };

  const modulosSeleccionadosNombres = (formData.idPermisos || [])
    .map(id => permisosDisponibles.find(p => p.idPermiso === id)?.nombre)
    .filter(Boolean);

  return (
    <>
      <div className="rol-seccionInformacionRol">
        <h3>Información del Rol</h3>
        <div className="rol-formularioInformacionRol">
          {/* ... campos de nombre y descripción sin cambios ... */}
           <div className="rol-campoContainer">
            <label htmlFor="nombreRolInput" className="rol-label">
              Nombre del Rol: <span className="required-asterisk">*</span>
            </label>
            <input
              id="nombreRolInput" type="text" name="nombre" value={formData.nombre}
              onChange={handleInputChange} className="rol-input" disabled={isRoleAdmin} required
            />
            {formErrors.nombre && <span className="error-message">{formErrors.nombre}</span>}
          </div>
          <div className="rol-campoContainer">
            <label htmlFor="descripcionRolInput" className="rol-label">
              Descripción del Rol:
            </label>
            <textarea
              id="descripcionRolInput" name="descripcion" value={formData.descripcion}
              onChange={handleInputChange} className="rol-textarea" disabled={isRoleAdmin}
            />
          </div>
          {isEditing && !isRoleAdmin && (
            <div className="rol-campoContainer">
              <label className="rol-label">Estado (Activo):</label>
              <label className="switch">
                <input type="checkbox" name="estado" checked={formData.estado} onChange={handleInputChange} />
                <span className="slider"></span>
              </label>
            </div>
          )}
        </div>
      </div>

      {!isRoleAdmin && (
        <button type="button" className="rol-botonSeleccionarPermisos" onClick={handleToggleMostrarPermisos}>
          {mostrarPermisos ? "Ocultar Módulos" : "Seleccionar Módulos"}
        </button>
      )}

      {/* AQUÍ EL CAMBIO PRINCIPAL: PASAMOS LOS PERMISOS AGRUPADOS */}
      <PermisosSelector
        permisosAgrupados={permisosAgrupados}
        permisosSeleccionadosIds={formData.idPermisos || []}
        onTogglePermiso={onToggleModulo}
        isRoleAdmin={isRoleAdmin}
        mostrar={mostrarPermisos || isRoleAdmin}
      />

       {(mostrarPermisos || isRoleAdmin) &&
        <div className="rol-seccionModulosSeleccionados">
            <h3>Módulos Seleccionados ({modulosSeleccionadosNombres.length})</h3>
            {modulosSeleccionadosNombres.length > 0 ? (
            <ul className="rol-listaModulosSeleccionados">
                {modulosSeleccionadosNombres.map((nombre, index) => (
                    <li key={index}>{nombre}</li>
                ))}
            </ul>
            ) : (
            <p>No hay módulos seleccionados</p>
            )}
        </div>
      }
    </>
  );
};

export default RolForm;
# Coordinacion Docente-Terapeuta (RedNeC v2)

Plataforma integral y multidisciplinar para la coordinacion del seguimiento pedagogico, clinico y familiar de estudiantes con necesidades de apoyo educativo y neurodesarrollo.

> **Proyecto Practica Profesional I - 2do Cuatrimestre 2026**  
> Repositorio de referencia aplicado: [material-unidad-1-2do-cuatrimestre-2026](https://github.com/aguscenturion/material-unidad-1-2do-cuatrimestre-2026)

---

## Novedades y Mejoras de la Version 2

1. **Frontend Moderno en React (SPA):**
   - Migracion de HTML/JS plano a **React 18 + Vite** con componentes modulares.
   - Navegacion protegida por roles (docente, 	erapeuta, amiliar, dmin).
   - Bitacora cronologica multidisciplinar con semaforos de estado (ueno, egular, tencion).
   - Context API para sesion global, tokens y cambio de rol.

2. **Seguridad y Validaciones con express-validator:**
   - Implementacion estricta del patron de la materia: validaciones por entidad (uth.validation.js, lumno.validation.js, eporte.validation.js) y middleware centralizado (alidate.js).
   - Autenticacion segura mediante JWT y cookies HttpOnly.
   - Encriptacion de contrasenias con cryptjs.

3. **Protocolo Riguroso de Verificacion de Identidad:**
   - Resuelve el problema critico: *Como aseguramos que quien dice ser docente, terapeuta o familiar lo es realmente?*
   - **Docente:** Validacion por CUE institucional de la escuela (9 digitos) y correo oficial.
   - **Terapeuta:** Registro obligatorio de Matricula Profesional (MN/MP), colegio emisor y doble factor mediante **Codigo de Consentimiento Familiar**.
   - **Familiar:** Vinculacion por codigo de matricula escolar presencial (generado por la institucion) o cotejo de patria potestad/tutela con DNI.
   - **Panel de Auditoria de Coordinacion:** Estados de cuenta (PENDIENTE, APROBADO, RECHAZADO) que bloquean el acceso a datos de menores hasta que las credenciales sean convalidadas.

---

## Requisitos y Base de Datos (WampServer)

- **WampServer** en ejecucion con servicio **MySQL** activo en el puerto `3306`.
- Usuario por defecto: `root` (sin contrasenia).
- Base de datos por defecto: `rednec_db_2` (se crea automaticamente al iniciar si no existe).

---

## Como Iniciar el Proyecto

### Opcion Rapida (Iniciar Todo con un Solo Comando):

En la raiz del proyecto ejecuta:

```bash
npm run dev
```

Este comando iniciara concurrentemente:
- **Backend API:** `http://localhost:3001` (conectado a MySQL en WampServer).
- **Frontend React (Vite):** `http://localhost:5173` (o el siguiente puerto libre).

---

### Poblar la Base de Datos con Datos de Prueba:

```bash
npm run seed
```

---

### Comandos Individuales:

- **Solo Backend:** `npm run dev:backend`
- **Solo Frontend:** `npm run dev:frontend`
- **Compilar Frontend:** `npm run build:frontend`

---

## Credenciales de Prueba Pre-cargadas (Seed)

| Rol | Correo | Contrasenia | Estado de Verificacion |
| :--- | :--- | :--- | :--- |
| **Admin / Coordinador** | admin@rednec.com | Rednec123! | Verificado (Acceso al panel de auditoria) |
| **Docente** | docente@escuela.edu.ar | Rednec123! | Verificado (Escuela N° 12, CUE: 020012300) |
| **Terapeuta** | terapeuta@salud.com | Rednec123! | Verificado (MN-48291, Psicologia Infantil) |
| **Familiar** | familiar@familia.com | Rednec123! | Verificado (Madre de Lucas Martinez) |
| **Docente (Pendiente)** | mariana.docente@gmail.com | Rednec123! | En Revision (Para probar el panel de aprobacion) |
| **Terapeuta (Pendiente)** | carlos.terapeuta@salud.com | Rednec123! | En Revision (Fonoaudiologia MP-91823) |

> En la pantalla de Login tienes botones de acceso rapido con un solo clic para cada uno de estos perfiles.
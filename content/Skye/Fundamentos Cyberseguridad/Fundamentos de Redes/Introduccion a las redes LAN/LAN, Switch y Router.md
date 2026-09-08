### Resumen: Topologías LAN, Switch y Router

Las **LAN topologies** (_topologías de red local_) son las formas en que se pueden conectar los dispositivos dentro de una red local. Cada diseño tiene ventajas y desventajas según el costo, rendimiento, mantenimiento y tolerancia a fallos.
**LAN** -> *"Local Área Network"*

---

## 1. Star topology (_topología de estrella_)

En la **star topology**, todos los dispositivos se conectan a un dispositivo central, normalmente un **switch** (_conmutador_) o **hub** (_concentrador_).

Es una de las topologías más usadas porque es **confiable y escalable**, es decir, permite agregar más dispositivos fácilmente.

**Ventajas:**

- Es fácil agregar nuevos dispositivos.
- Si falla un cable de un dispositivo, solo ese dispositivo se ve afectado.
- Es más ordenada y fácil de administrar.

**Desventaja principal:**

- Si falla el dispositivo central, como el **switch**, toda la red puede dejar de funcionar.

---

## 2. Bus topology (_topología de bus_)

En la **bus topology**, todos los dispositivos están conectados a un solo cable principal llamado **backbone cable** (_cable troncal_).

Los datos viajan por el mismo cable, por eso puede haber lentitud si varios dispositivos envían información al mismo tiempo.

**Ventajas:**

- Es barata.
- Usa poco cableado.
- Es fácil de instalar en redes pequeñas.

**Desventajas:**

- Si el cable principal falla, toda la red deja de funcionar.
- Puede saturarse fácilmente.
- Es más difícil encontrar dónde está el problema.

---

## 3. Ring topology (_topología de anillo_)

En la **ring topology**, los dispositivos se conectan formando un círculo o bucle. Los datos viajan de un dispositivo a otro hasta llegar al destino.

Esta topología usa menos cable que la de estrella, pero puede ser menos eficiente porque los datos deben pasar por varios dispositivos antes de llegar.

**Ventajas:**

- Usa menos cableado.
- Puede evitar cierta saturación porque los datos siguen una dirección.

**Desventajas:**

- Si un dispositivo o cable falla, puede interrumpirse toda la red.
- No es tan eficiente si el dato tiene que pasar por muchos dispositivos.

---

## 4. Switch (_conmutador_)

Un **switch** es un dispositivo de red que permite conectar varios equipos dentro de una misma red, como computadoras, impresoras o servidores.

A diferencia de un **hub** (_concentrador_), el **switch** no envía la información a todos los dispositivos. El switch aprende qué dispositivo está conectado a cada puerto y envía los datos directamente al destino correcto.

**En resumen:**

```
switch = conecta dispositivos dentro de una misma red
```

Esto ayuda a reducir el tráfico innecesario y mejora el rendimiento de la red.

---

## 5. Router (_enrutador_)

Un **router** es un dispositivo que conecta diferentes redes entre sí. Por ejemplo, puede conectar la red de tu casa con Internet.

El proceso que realiza se llama **routing** (_enrutamiento_), que consiste en buscar la mejor ruta para que los datos lleguen desde un origen hasta un destino.

**En resumen:**

```
router = conecta redes diferentesswitch = conecta dispositivos dentro de la misma red
```

Por ejemplo, si una computadora quiere comunicarse con otra en otra red, los datos pasan por varios **routers** hasta llegar al destino.

---

### Idea clave para recordar

Una red puede organizarse de varias formas, como **star**, **bus** o **ring topology**. Para conectar dispositivos dentro de una red se usa un **switch**, mientras que para conectar diferentes redes se usa un **router**.
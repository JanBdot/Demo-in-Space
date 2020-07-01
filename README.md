# CG1_Pflicht

## Kompatibilität & Libraries
  * Diese Demo ist kompatibel mit WebGL1
  * Verwendete Libraries: *glMatrix*
  
  ----

## Lights
  * **Directional Light:**  
  Die Sonne funktioniert als Directional Light. Man kann die Position über das Interface einstellen, wobei das target immer das Raumschiff ist
  * **Spotlight:**  
  Das Raumschiff hat einen Scheinwerfer, der als Spotlight funktioniert. Wenn man *space* gedrückt hält, während man die Kamera bewegt, bewegt sich auch der Scheinwerfer.
  
  ----
  
## Shader
  * **Skybox:**  
  Die Skybox benutzt einen einfachen Vertex- & Fragment-Shader der eine Cubemap als Textur verwendet.
  
  __Alle Fragment-Shader, außer der Skybox, nutzen das selbe struct (*LightAttr*) für Lighting, welches über eine uniform deklariert ist.__
  
  * **Earth:**  
  Ist zum größten Teil der Shader aus der Übung. Änderungen betreffen das Licht. Die *LightDirection* wird nun über die *LightPosition* ausgerechnet.
  
  * **Asteroid:**  
  BESCHREIBUNG
  
  * **Spaceship:**  
  asd
  

# WebGl-Demo in Space
*&copy; Jan Bär and Shahab Abtahi*

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
  
  * **Moon:**  
  Teilt sich einen Verty Shader mit *earth* und unterscheidet sich sonst auch nur mit den Texturen. Für den Mond werden vier Texturen benutzt, eine diffuse-Map für die Grundfarbe, eine cloud-Map für Wolken und zwei Texturen für eine Moonbase mit Bewegung.
  
  * **Spaceship:**  
  Die Shader für das Raumschiff kümmern sich hauptsächlich um die "Reflektion" unter Berücksichtigung des Lichteinfalls. Die Reflektion wird über eine Cubemap (siehe *RenderToCubemap*) realisiert.
  
  * **Asteroid:**  
  Die Asteroid Shader, verarbeiten das Directional Light und das Spot Light und eine Textur. Die Randomisierung der Textur findet im JavaScript Code statt.
  
  * **Cockpit:**  
  Der Shader fürs Cockpit funktioniert ähnlich wie der für die Asteroiden, aber neutzt eine Farbe und Transparenz.
  
  ----
  
## Interaktion
  * **Kamera Interaktion:**  
  Durch ziehen mit der Maus kann man die Kamera bewegen und mit dem Mausrad kann man rein und rauszoomen, wobei der Fokus stets auf dem Raumschiff bleibt.
  
  * **Licht Interaktion:**  
  Wenn man die Maus zieht während man die *space* Taste drückt verändert sich der Spotlight-Scheinwerfer des Raumschiffs.  
  Zusätzlich kann man die Lichtstärke (*ambient, diffuse, specular*) über Regler einstellen und die Position des Sonnenlichts verändern (die Sonne selbst ist Teil der Skybox und verändert sich nicht mit).
  
  * **Asteroiden Interaktion:**  
  Über das UI kann man eine beliebige Anzahl (irgendwann spielt die Performance nicht mehr mit, bei mir 2.500) an Asteroiden erzeugen. Diese spawnen mit einem random Seed (*texture, obj-file, speed, rotation-speed, distance, y-Position*).
  
  -----
  
## Special

  * **Render to Cubemap**  
  Für jeden Frame wird von der Position des Raumschiffs 6 Bilder (alle Richtungen) in den Framebuffer gerendert. Diese Textur wird dann beim Zeichnen der Gesamtszene als Textur für das Raumschiff verwendet, wodurch eine Spiegelung in Realtime simuliert wird.
  
  * **Spotlight**  
  Das Raumschiff hat einen Scheinwerfer, damit dieser ein Spotlight auf die restlichen Objekte der Szene werfen kann, muss das Spotlight in den Fragment Shadern der Objekte berücksichtigt werden. Das betrifft *earth, moon & asteroid*.
  
  * **Super Secret Base on the Dark Side of the Moon  
  Wenn man genau hinschaut, sieht man sogar die Menschen auf der Basis.

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import ReactWhatsapp from "react-whatsapp";

import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
function App() {
  const [tipoSiniestro, setTipoSiniestro] = useState("");
  const [numeroServicio, setNumeroServicio] = useState("");
  const [numeroSiniestro, setNumeroSiniestro] = useState("");
  const [nombreAsegurado, setNombreAsegurado] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [numeroPlaca, setNumeroPlaca] = useState("");
  const [marcaAuto, setMarcaAuto] = useState("");
  const [modeloAuto, setModeloAuto] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [deducible, setDeducible] = useState("• ");
  const [record, setRecord] = useState(false);
  const [recordAction, setRecordAction] = useState("numeroSiniestro");
  const [textButton, setTextButton] = useState("Visualizar Mensaje");
  const [saludo, setSaludo] = useState("");
  const [visibleCard, setVisibleCard] = useState(true);
  const [textSend, setTextSend] = useState("");
  const recognition = new webkitSpeechRecognition();
  useEffect(() => {
    const horaActual = new Date().getHours();

    if (horaActual >= 5 && horaActual < 12) {
      setSaludo("Buenos días");
    } else if (horaActual >= 12 && horaActual < 19) {
      setSaludo("Buenas tardes");
    } else {
      setSaludo("Buenas noches");
    }
  }, []);
  recognition.lang = "es-ES";
  recognition.continuous = true;

  function startRecord(word) {
    recognition.start();
    console.log(word);
    recognition.onresult = (event) => {
      for (const result of event.results) {
        const transcript = result[0].transcript;

        if (word === "numeroServicio" && transcript) {
          setNumeroServicio(transcript.replace(" ", ""));
        } else if (word === "numeroSiniestro" && transcript) {
          setNumeroSiniestro(transcript);
        } else if (word === "nombreAsegurado" && transcript) {
          setNombreAsegurado(transcript);
          setNombreContacto(transcript);
        } else if (word === "nombreContacto" && transcript) {
          setNombreContacto(transcript);
        } else if (word === "numeroTelefono" && transcript) {
          setNumeroTelefono(transcript);
        } else if (word === "numeroPlaca" && transcript) {
          setNumeroPlaca(transcript);
        } else if (word === "marcaAuto" && transcript) {
          setMarcaAuto(transcript);
        } else if (word === "modeloAuto" && transcript) {
          setModeloAuto(transcript);
        } else if (word === "ubicacion" && transcript) {
          setUbicacion(transcript);
        } else if (word === "deducible" && transcript) {
          setDeducible(transcript);
        }
      }
    };
  }

  const tipos = [
    "Atropello",
    "Caída en hueco",
    "Caída en hueco(fluidos)",
    "Coque contra 3ro. en movimiento",
    "Coque contra animal",
    "Choque contra objeto",
    "Choque estacionado",
    "Choque y fuga",
    "Daños por intento de robo",
    "Daños por objeto contundente",
    "Despiste",
    "Incendio y/o rayo",
    "Riesgos de la naturaleza",
    "Riesgos políticos",
    "Robo de accesorios musicales",
    "Robo de autopartes",
    "Robo de autopartes (computadora)",
    "Robo recuperado",
    "Robo total estacionado",
    "Robo total por asalto",
    "Terremoto, temblor",
    "Volcadura",
  ];
  const makeText = () => {
    
      console.log('Hola')
      setTextSend(texto)
  };
  const handleWhatsAppLink = (phoneNumber) => {
    const texto =
      `${saludo}\n` +
      `*Tipo de Siniestro:* ${tipoSiniestro}\n` +
      `*Número de Servicio:* ${numeroServicio.replace(" ", "")}\n` +
      `*Número de Siniestro:* ${numeroSiniestro.replace(" ", "")}\n` +
      `*Nombre del Asegurado:* ${nombreAsegurado}\n` +
      `*Nombre del Contacto:* ${nombreContacto}\n` +
      `*Número de Teléfono:* ${numeroTelefono.replace(" ", "")}\n` +
      `*Placa del auto:* ${numeroPlaca.replace(" ", "").toUpperCase()}\n` +
      `*Marca y Modelo del auto:* ${marcaAuto} - ${modeloAuto.replace(
        " ",
        ""
      )}\n` +
      `*Ubicación del siniestro:* ${ubicacion}\n` +
      `*Deducible:* ` + '\n' + `${deducible}\n` +
      "Me avisas, gracias.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      texto
    )}`;
    window.open(whatsappURL, "_blank"); // Abre en una nueva pestaña o ventana
  };
  const handleTextareaChange = (event) => {
    setDeducible(event.target.value);
  };

  const handleTextareaKeyPress = (event) => {
    if(deducible.length==0){
      setDeducible("• ")
    }
    if (event.key === 'Enter') {
      console.log('hola')
      event.preventDefault();
      setDeducible(deducible + '\n• ');
    }
    if(event.key==='Backspace'){
      
      if(deducible.length==2){
        setDeducible("• ")
        event.preventDefault();
      }
     
    }
  };
  return (
    <section className="section-all">
      <header>
        <h1>Registro de Caso</h1>
      </header>

      <div className="card" style={{ display: visibleCard ? "block" : "none" }}>
        <Select
          label="Tipo de Siniestro"
          placeholder="Selecciones el tipo"
          className="max-w-xs dark text-white"
          value={tipoSiniestro}
          onChange={(e) => setTipoSiniestro(e.target.value)}
        >
          {tipos.map((tipo) => (
            <SelectItem key={tipo} value={tipo}>
              {tipo}
            </SelectItem>
          ))}
        </Select>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={numeroServicio.replace(" ", "")}
            onChange={(e) => setNumeroServicio(e.target.value)}
            type="text"
            variant="ghost"
            label="Número de Servicio"
            placeholder="Ingrese el número de servicio"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("numeroServicio");
              startRecord("numeroServicio");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={numeroSiniestro.replace(" ", "")}
            onChange={(e) => setNumeroSiniestro(e.target.value)}
            type="text"
            variant="ghost"
            label="Número de Siniestro"
            placeholder="Ingrese el número de siniestro"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("numeroSiniestro");
              startRecord("numeroSiniestro");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={nombreAsegurado}
            onChange={(e) => {
              setNombreAsegurado(e.target.value);
              setNombreContacto(e.target.value);
            }}
            type="text"
            variant="ghost"
            label="Nombre del Asegurado"
            placeholder="Ingrese el nombre del asegurado"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("nombreAsegurado");
              startRecord("nombreAsegurado");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={nombreContacto}
            onChange={(e) => setNombreContacto(e.target.value)}
            type="text"
            variant="ghost"
            label="Nombre de Contacto"
            placeholder="Ingrese el nombre del contacto"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("nombreContacto");
              startRecord("nombreContacto");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
            type="phone"
            variant="ghost"
            label="Número de Teléfono"
            placeholder="Ingrese el número de teléfono"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("numeroTelefono");
              startRecord("numeroTelefono");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input placa"
            value={numeroPlaca}
            onChange={(e) => setNumeroPlaca(e.target.value)}
            type="text"
            variant="ghost"
            label="Número de Placa"
            placeholder="Ingrese el número de placa"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("numeroPlaca");
              startRecord("numeroPlaca");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={marcaAuto}
            onChange={(e) => setMarcaAuto(e.target.value)}
            type="text"
            variant="ghost"
            label="Marca de Auto"
            placeholder="Ingrese la marca de auto"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("marcaAuto");
              startRecord("marcaAuto");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Input
            className="input"
            value={modeloAuto}
            onChange={(e) => setModeloAuto(e.target.value)}
            type="text"
            variant="ghost"
            label="Modelo de Auto"
            placeholder="Ingrese el modelo de auto"
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("modeloAuto");
              startRecord("modeloAuto");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Textarea
            label="Ubicación del Siniestro"
            labelPlacement="outside"
            placeholder="Ingresa la ubicación del siniestro"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("ubicacion");
              startRecord("ubicacion");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
        <Card className="dark card-cont">
          <Textarea
            label="Deducible"

            labelPlacement="outside"
            placeholder="Ingresa el deducible"
            value={deducible}
            onChange={handleTextareaChange}
            onKeyDown={handleTextareaKeyPress}
          />
          <Button
            variant="ghost"
            className="btn-record"
            onClick={() => {
              setRecordAction("deducible");
              startRecord("deducible");
            }}
            color="primary"
          >
            Grabar
          </Button>
        </Card>
      </div>

      <Card
        className="dark"
        style={{ width: "350px", display: !visibleCard ? "flex" : "none" }}
      >
        <CardHeader className="flex gap-3">
          <h3 className="text-white" style={{ fontWeight: "bold" }}>
            Visualización del Mensaje
          </h3>
        </CardHeader>
        <Divider />
        <CardBody className="card-body">
          <p>{saludo}</p>
          <p>
            <b>Tipo de Siniestro: </b>
            {tipoSiniestro}
          </p>
          <p>
            <b>Número de Servicio: </b>
            {numeroServicio.replace(" ", "")}
          </p>
          <p>
            <b>Número de Siniestro: </b>
            {numeroSiniestro.replace(" ", "")}
          </p>
          <p>
            <b>Nombre del Asegurado: </b>
            {nombreAsegurado}
          </p>
          <p>
            <b>Nombre del Contacto: </b>
            {nombreContacto}
          </p>
          <p>
            <b>Número de Teléfono: </b>
            {numeroTelefono.replace(" ", "")}
          </p>
          <p>
            <b>Placa del auto: </b>
            {numeroPlaca.replace(" ", "").toUpperCase()}
          </p>
          <p>
            <b>Marca y Modelo del auto: </b>
            {marcaAuto} - {modeloAuto.replace(" ", "")}
          </p>
          <p>
            <b>Ubicación del siniestro: </b>
            {ubicacion}
          </p>
          <p>
            <b>Deducible: </b>
          </p>
          <p>{deducible}</p>
          <p>Me avisas, gracias.</p>
        </CardBody>
      </Card>
      <Button
        onClick={() => {
          setVisibleCard(false);
          setTextButton("Enviar Mensaje");
          !visibleCard ? handleWhatsAppLink("+51953209302") : {};
        }}
        style={{ marginBlock: "1rem", width: "350px", fontWeight: "bold" }}
        color="primary"
      >
        {textButton}
      </Button>
      {!visibleCard && (
        <Button
          onClick={() => {
            setVisibleCard(true);
            setTextButton("Visualizar Mensaje");
          }}
          style={{ width: "350px", fontWeight: "bold" }}
          color="default"
          className="dark"
        >
          Cambiar Datos
        </Button>
      )}
    </section>
  );
}

export default App;

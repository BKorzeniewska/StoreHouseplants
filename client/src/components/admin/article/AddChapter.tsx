import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createChapter, CreateChapterRequest } from "../../common/apis/chapter";
import { useError } from "../../common/ErrorContext";

type Props = {
  isShown: boolean;
  onClose: () => void;
};
export const AddChapter: React.FC<Props> = ({ isShown, onClose }) => {
  const [chapterName, setChapterName] = useState("");
  const [chapterImage, setChapterImage] = useState('');
  const { setError } = useError();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request: CreateChapterRequest = {
      name: chapterName,
      image: chapterImage,
    };
    createChapter(request).then((response) => {
      if (response.isOk) {
        window.location.reload();
      } else {
        console.log(response);
        setError("Nie udało się utworzyć rozdziału");
      }
    });
    onClose();
  };
  const handleImageClick = () => {
    const imageFileInput = document.getElementById('image-file') as HTMLInputElement;
    imageFileInput?.click();
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result.toString().split(',')[1];
          setChapterImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <>
        <Modal show={isShown} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dodaj Rozdział</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa rozdziału</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Rozdział"
                    autoFocus
                    value={chapterName}
                    onChange={(event) => setChapterName(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Grafika</Form.Label>
                <div/>
                <img src={`data:image/jpg;base64,${chapterImage}`} alt='Grafika' onClick={handleImageClick} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <div/>
                <input
                    type='file'
                    id='image-file'
                    name='image'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
              </Form.Group>
              <hr/>
              <Button variant="primary" type="submit" style={{ marginLeft: '15px', width: '93%' }}>
                Dodaj
              </Button>
              <Button variant="secondary" onClick={onClose} style={{ marginLeft: '15px', width: '93%', marginTop:'12px', color: 'white'}}>
                Zamknij
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
  );
};

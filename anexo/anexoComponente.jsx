import React, { Component } from 'react';

/*<AnexoComponente onDroppedFile={this.handleDroppedFile}></AnexoComponente>*/
class AnexoComponente extends Component {


    constructor(props) {
        super(props);


        this.state = {
            isOnDragOver: false,
            imagesFile: [],
            anexado: false,
            msgAlerta: ''
        }
    }


    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        this.setState({ isOnDragOver: true })
    }

    handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isOnDragOver: false });
    }

    handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ isOnDragOver: false });

        let files = e.dataTransfer.files;
        
        if (e.dataTransfer.files.length === 0) {
            this.setState({ msgAlerta: '*Arquivo não encontrado!' });
            return;
        }

        if (e.dataTransfer.files[0].size > 300000) {
            this.setState({ msgAlerta: '*Tamanho máximo permitido é de 300KB!' });
            return;
        }

        if (!files[0].type.match('image/jpeg')) {
            this.setState({ msgAlerta: '*Somente extenções ".jpg" são permitidas!' });
            return;
        }

        if (files[0].type.match('image/jpeg')) {
            let type = files[0].type;
            let name = files[0].name;
            // console.log('type', type);
            // console.log('name', name);

            this.readAsDataURL(files[0])
                .then((result) => {
                    let stateFiles = this.state.imagesFile;

                    const fileResult = {
                        data: result,
                        type: type,
                        name: name
                    };

                    stateFiles.push(fileResult);

                    this.props.onDroppedFile(fileResult);
                    this.setState({ imagesFile: stateFiles, anexado: true });
                });
        }





    }

    readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onerror = reject;
            fr.onload = function () {
                resolve(fr.result);
            }
            fr.readAsDataURL(file);
        });
    }




    render() {
        return (
            <>
                {
                    !this.state.anexado ? (
                        <div>
                            <div
                                className={`w-100 border ${this.state.isOnDragOver ? 'bg-primary' : ''} d-flex justify-content-center align-items-center`}
                                onDragOver={this.handleDragOver}
                                onDragLeave={this.handleDragLeave}
                                onDrop={this.handleDrop}
                                draggable
                                style={{ height: '100px' }}>
                                <h5 className={`${this.state.isOnDragOver ? 'text-white' : 'text-secondary'}`}> Arraste e solte o arquivo </h5>
                            </div>
                            <small className="text-danger d-block"> {this.state.msgAlerta} </small>
                        </div>
                    ) : (

                            <div className="text-center">
                                <img src={this.state.imagesFile[0].data} key={this.state.imagesFile[0].name} width="200px" alt="imagem exemplo" />
                            </div>

                        )
                }



            </>

        );
    }
}

export default AnexoComponente;
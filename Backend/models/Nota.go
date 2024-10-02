package models

type Nota struct {

	Carnet  int32 `json:"carnet"`
	Nombre string `json:"nombre"`
	Curso   string `json:"curso"`
	Nota    int32 `json:"nota"`
	Semestre string `json:"semestre"`
	Year   int32 `json:"year"`
}
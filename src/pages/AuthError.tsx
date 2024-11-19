

function AuthError() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }}>
            <div style={{
                border: "5px solid gray", borderRadius: "10px", width: "500px",
                height: "250px", fontSize: "30px",
                paddingTop: "", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            }}> <div >Lütfen giriş yapınız.</div>
                <div><a href="/login" style={{ textDecoration: "none", color: "black", margin: "35px", backgroundColor: "gold", borderRadius: "5px", padding: "5px" }}>Giriş Yap</a>
                    <a href="/signup" style={{ textDecoration: "none", color: "black", margin: "35px", backgroundColor: "green", borderRadius: "5px", padding: "5px", width: "100px" }}>Kayıt Ol</a>
                </div>
            </div>
        </div >
    )
}

export default AuthError
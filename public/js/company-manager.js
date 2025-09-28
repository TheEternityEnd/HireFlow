// company-manager.js
class CompanyManager {
  constructor() {
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  // Subir archivo a Firebase Storage
  async uploadFile(file, path) {
    try {
      const storageRef = this.storage.ref(path);
      const snapshot = await storageRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error al subir archivo:', error);
      return { success: false, error: error.message };
    }
  }

  // Crear nueva empresa
  async createCompany(companyData, userId) {
    try {
      // Subir logo si existe
      let logoURL = null;
      if (companyData.logoFile) {
        const logoResult = await this.uploadFile(
          companyData.logoFile, 
          `companies/${userId}/logo_${Date.now()}`
        );
        if (logoResult.success) {
          logoURL = logoResult.url;
        }
      }

      // Subir fotos si existen
      const photosURLs = [];
      if (companyData.photoFiles && companyData.photoFiles.length > 0) {
        for (let i = 0; i < companyData.photoFiles.length; i++) {
          const photoResult = await this.uploadFile(
            companyData.photoFiles[i],
            `companies/${userId}/photo_${Date.now()}_${i}`
          );
          if (photoResult.success) {
            photosURLs.push(photoResult.url);
          }
        }
      }

      // Crear documento de empresa en Firestore
      const companyDoc = {
        ...companyData,
        logo: logoURL,
        photos: photosURLs,
        ownerId: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending',
        views: 0,
        followers: 0
      };

      // Eliminar los archivos del objeto antes de guardar en Firestore
      delete companyDoc.logoFile;
      delete companyDoc.photoFiles;

      const docRef = await this.db.collection('companies').add(companyDoc);
      
      return { 
        success: true, 
        companyId: docRef.id,
        data: companyDoc
      };
    } catch (error) {
      console.error('Error al crear empresa:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener empresas de un usuario
  async getUserCompanies(userId) {
    try {
      const snapshot = await this.db
        .collection('companies')
        .where('ownerId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const companies = [];
      snapshot.forEach(doc => {
        companies.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, companies };
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      return { success: false, error: error.message };
    }
  }

  // Actualizar empresa
  async updateCompany(companyId, updates) {
    try {
      await this.db.collection('companies').doc(companyId).update({
        ...updates,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
      return { success: false, error: error.message };
    }
  }

  // Eliminar empresa
  async deleteCompany(companyId) {
    try {
      await this.db.collection('companies').doc(companyId).delete();
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      return { success: false, error: error.message };
    }
  }
}
// USAGE
// scriptcs exporter.cs -- app/Templates app/Controls
// To run, install .NET Core on Mac/Windows/Linux/Docker https://www.microsoft.com/net/core
// ScriptCS
using System.Text.RegularExpressions;

CreateExports();

public void CreateExports() {
    // e.g. 'C:\Apps\MyProject'
    string rootDir = new DirectoryInfo(@".\").FullName;
    
    string exportFileName = "export.ts";
    List<string> exportDirectoryPaths = new List<string>();
    foreach (string argument in Env.ScriptArgs) {
        if (argument.Contains(".ts"))
            exportFileName = argument;
        else
            exportDirectoryPaths.Add(argument);
    }
    Console.WriteLine("File Name:" + exportFileName);
    foreach (string exportDirPath in exportDirectoryPaths) {
        // e.g. 'app\Templates'
        var exportDirPathFixed = exportDirPath.Replace("/", "\\");
        Console.WriteLine(String.Format("Exporting -> {0}", exportDirPath));
       
        List<ExportEntry> exportEntriesToWrite = new List<ExportEntry>();
        // e.g. 'C:\Apps\MyProject\app\Templates' 
        DirectoryInfo exportDir = new DirectoryInfo(rootDir + exportDirPathFixed);
        foreach (FileInfo file in exportDir.EnumerateFiles("*.ts", SearchOption.AllDirectories)) {
            // Don't export the export file ;)
            if (file.Name == exportFileName)
                continue;
            // e.g. toAdd = {
                // RelativepathToExportDirectory = './app/templates/template-one.component'
                // ClassName = 'TemplateOneComponent' (Parsed from file contents, works with interfaces)
            ExportEntry toAdd = CreateExportEntry(file, exportDirPathFixed, rootDir);
            if (toAdd != null)
                exportEntriesToWrite.Add(toAdd);
        }
        CreateExportFile(exportDir.FullName + "\\" + exportFileName, exportEntriesToWrite);
        
    }
}


private void CreateExportFile(string exportFilePath, IEnumerable<ExportEntry> exportEntries) {
    string textToWrite = "";
    foreach (ExportEntry entry in exportEntries) {
        textToWrite += entry.ToString() + Environment.NewLine;
    }
    Console.WriteLine("Text: " + Environment.NewLine + textToWrite);
    File.WriteAllText(exportFilePath, textToWrite);
}

// -- Create Export Entry -- //
private ExportEntry CreateExportEntry(FileInfo exportFile, string exportDirPath, string rootDir) {
    ExportEntry toReturn = new ExportEntry() {
        ClassName = GetFirstExportClassName(exportFile),
        RelativepathToExportDirectory = exportFile.FullName.Remove(0, rootDir.Length + exportDirPath.Length).Replace(".ts", ""),
    };
    if (String.IsNullOrWhiteSpace(toReturn.ClassName))
        toReturn = null;
    return toReturn;

}
private string GetFirstExportClassName(FileInfo exportFile) {
    string className = null;
    Regex regular = new Regex(@"(?<=export[\s+](abstract[\s+]|\s*)(class|interface))[^s+][^\s]+");

    using (StreamReader streamer = new StreamReader(exportFile.OpenRead())) {
        string contents = streamer.ReadToEnd();
        Match componentNameMatch = regular.Match(contents);
        className = componentNameMatch.ToString().Replace("{", "");
    }
    return className;
}

public class ExportEntry {
    public string RelativepathToExportDirectory { get; set; }
    private string _ClassName;
    public string ClassName { 
        get { return _ClassName; }
        set { _ClassName = value.Trim(); }
    }

    /// <summary>
    /// Returns the formatted export entry 
    /// e.g. " export {MyComponents} from './Components/my-component.component' "
    /// </summary>
    /// <returns></returns>
    public override string ToString() {
        //      export { AppComponent} from './my-template/my-template.component'
        return String.Format("export {{ {0} }} from '.{1}';", this.ClassName, this.RelativepathToExportDirectory).Replace('\\', '/');
    }
}
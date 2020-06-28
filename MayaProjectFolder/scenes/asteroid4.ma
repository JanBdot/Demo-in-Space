//Maya ASCII 2020 scene
//Name: asteroid4.ma
//Last modified: Sun, Jun 28, 2020 11:13:21 AM
//Codeset: 1252
requires maya "2020";
requires "mtoa" "4.0.2";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya 2020";
fileInfo "version" "2020";
fileInfo "cutIdentifier" "202002251615-329d215872";
fileInfo "osv" "Microsoft Windows 10 Technical Preview  (Build 18363)\n";
fileInfo "UUID" "B7E21D21-45E5-E5ED-240A-ADA739CE41AD";
fileInfo "license" "student";
createNode transform -s -n "persp";
	rename -uid "3F1F51C8-489E-45F0-64BF-2D9B97A300EA";
	setAttr ".v" no;
	setAttr ".t" -type "double3" -0.75241473543065118 1.0152664334373629 -6.1279262633022284 ;
	setAttr ".r" -type "double3" -9.3383527478505162 1266.9999999994798 0 ;
createNode camera -s -n "perspShape" -p "persp";
	rename -uid "6B3C2693-44A5-BE7B-A92F-1FBF5844977B";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999993;
	setAttr ".coi" 6.256866160743936;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
	setAttr ".hc" -type "string" "viewSet -p %camera";
	setAttr ".ai_translator" -type "string" "perspective";
createNode transform -s -n "top";
	rename -uid "F8A8C1CF-46DF-C44C-3408-40A7EC8E779B";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 1000.1 0 ;
	setAttr ".r" -type "double3" -90 0 0 ;
createNode camera -s -n "topShape" -p "top";
	rename -uid "3D51B419-472F-F448-6D65-64B6034AD881";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "top";
	setAttr ".den" -type "string" "top_depth";
	setAttr ".man" -type "string" "top_mask";
	setAttr ".hc" -type "string" "viewSet -t %camera";
	setAttr ".o" yes;
	setAttr ".ai_translator" -type "string" "orthographic";
createNode transform -s -n "front";
	rename -uid "A671FA7B-439E-101F-C723-E6A30BBCB1B1";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 0 1000.1 ;
createNode camera -s -n "frontShape" -p "front";
	rename -uid "FD3E80A8-4075-20C2-5D76-BE938BA02404";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "front";
	setAttr ".den" -type "string" "front_depth";
	setAttr ".man" -type "string" "front_mask";
	setAttr ".hc" -type "string" "viewSet -f %camera";
	setAttr ".o" yes;
	setAttr ".ai_translator" -type "string" "orthographic";
createNode transform -s -n "side";
	rename -uid "DCCA561D-4B89-2C76-6627-D2B203BD3B95";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 1000.1 0 0 ;
	setAttr ".r" -type "double3" 0 90 0 ;
createNode camera -s -n "sideShape" -p "side";
	rename -uid "660DB8FF-4E4E-E986-A5E6-58A9DEB21E96";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 1000.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "side";
	setAttr ".den" -type "string" "side_depth";
	setAttr ".man" -type "string" "side_mask";
	setAttr ".hc" -type "string" "viewSet -s %camera";
	setAttr ".o" yes;
	setAttr ".ai_translator" -type "string" "orthographic";
createNode transform -n "pCube1";
	rename -uid "CD7D3C5D-4496-2359-3B65-C0BB00488A24";
	setAttr ".s" -type "double3" 1.2440435866727966 0.75849171323554043 1 ;
createNode mesh -n "pCubeShape1" -p "pCube1";
	rename -uid "193AA4F5-4FAA-6ACE-90E2-8CB9869DD151";
	setAttr -k off ".v";
	setAttr ".vir" yes;
	setAttr ".vif" yes;
	setAttr ".pv" -type "double2" 0.5 0.50000005960464478 ;
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr ".covm[0]"  0 1 1;
	setAttr ".cdvm[0]"  0 1 1;
	setAttr ".dr" 1;
	setAttr ".ai_translator" -type "string" "polymesh";
createNode transform -n "pCube2";
	rename -uid "71C6A7A6-43DD-B0D4-96BA-75AA9CEDBD65";
	setAttr ".v" no;
	setAttr ".s" -type "double3" 1.2440435866727966 0.75849171323554043 1 ;
createNode mesh -n "pCubeShape2" -p "pCube2";
	rename -uid "021ACC6D-41AF-2E76-0BE2-33B87601A547";
	setAttr -k off ".v";
	setAttr ".vir" yes;
	setAttr ".vif" yes;
	setAttr ".pv" -type "double2" 0.27500000596046448 0.40000006556510925 ;
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 186 ".uvst[0].uvsp[0:185]" -type "float2" 0.375 0 0.42500001
		 0 0.47500002 0 0.52500004 0 0.57500005 0 0.62500006 0 0.375 0.050000001 0.42500001
		 0.050000001 0.47500002 0.050000001 0.52500004 0.050000001 0.57500005 0.050000001
		 0.62500006 0.050000001 0.375 0.1 0.42500001 0.1 0.47500002 0.1 0.52500004 0.1 0.57500005
		 0.1 0.62500006 0.1 0.375 0.15000001 0.42500001 0.15000001 0.47500002 0.15000001 0.52500004
		 0.15000001 0.57500005 0.15000001 0.62500006 0.15000001 0.375 0.2 0.42500001 0.2 0.47500002
		 0.2 0.52500004 0.2 0.57500005 0.2 0.62500006 0.2 0.375 0.25 0.42500001 0.25 0.47500002
		 0.25 0.52500004 0.25 0.57500005 0.25 0.62500006 0.25 0.375 0.30000001 0.42500001
		 0.30000001 0.47500002 0.30000001 0.52500004 0.30000001 0.57500005 0.30000001 0.62500006
		 0.30000001 0.375 0.35000002 0.42500001 0.35000002 0.47500002 0.35000002 0.52500004
		 0.35000002 0.57500005 0.35000002 0.62500006 0.35000002 0.375 0.40000004 0.42500001
		 0.40000004 0.47500002 0.40000004 0.52500004 0.40000004 0.57500005 0.40000004 0.62500006
		 0.40000004 0.375 0.45000005 0.42500001 0.45000005 0.47500002 0.45000005 0.52500004
		 0.45000005 0.57500005 0.45000005 0.62500006 0.45000005 0.375 0.50000006 0.42500001
		 0.50000006 0.47500002 0.50000006 0.52500004 0.50000006 0.57500005 0.50000006 0.62500006
		 0.50000006 0.375 0.55000007 0.42500001 0.55000007 0.47500002 0.55000007 0.52500004
		 0.55000007 0.57500005 0.55000007 0.62500006 0.55000007 0.375 0.60000008 0.42500001
		 0.60000008 0.47500002 0.60000008 0.52500004 0.60000008 0.57500005 0.60000008 0.62500006
		 0.60000008 0.375 0.6500001 0.42500001 0.6500001 0.47500002 0.6500001 0.52500004 0.6500001
		 0.57500005 0.6500001 0.62500006 0.6500001 0.375 0.70000011 0.42500001 0.70000011
		 0.47500002 0.70000011 0.52500004 0.70000011 0.57500005 0.70000011 0.62500006 0.70000011
		 0.375 0.75000012 0.42500001 0.75000012 0.47500002 0.75000012 0.52500004 0.75000012
		 0.57500005 0.75000012 0.62500006 0.75000012 0.375 0.80000013 0.42500001 0.80000013
		 0.47500002 0.80000013 0.52500004 0.80000013 0.57500005 0.80000013 0.62500006 0.80000013
		 0.375 0.85000014 0.42500001 0.85000014 0.47500002 0.85000014 0.52500004 0.85000014
		 0.57500005 0.85000014 0.62500006 0.85000014 0.375 0.90000015 0.42500001 0.90000015
		 0.47500002 0.90000015 0.52500004 0.90000015 0.57500005 0.90000015 0.62500006 0.90000015
		 0.375 0.95000017 0.42500001 0.95000017 0.47500002 0.95000017 0.52500004 0.95000017
		 0.57500005 0.95000017 0.62500006 0.95000017 0.375 1.000000119209 0.42500001 1.000000119209
		 0.47500002 1.000000119209 0.52500004 1.000000119209 0.57500005 1.000000119209 0.62500006
		 1.000000119209 0.875 0 0.82499999 0 0.77499998 0 0.72499996 0 0.67499995 0 0.875
		 0.050000001 0.82499999 0.050000001 0.77499998 0.050000001 0.72499996 0.050000001
		 0.67499995 0.050000001 0.875 0.1 0.82499999 0.1 0.77499998 0.1 0.72499996 0.1 0.67499995
		 0.1 0.875 0.15000001 0.82499999 0.15000001 0.77499998 0.15000001 0.72499996 0.15000001
		 0.67499995 0.15000001 0.875 0.2 0.82499999 0.2 0.77499998 0.2 0.72499996 0.2 0.67499995
		 0.2 0.875 0.25 0.82499999 0.25 0.77499998 0.25 0.72499996 0.25 0.67499995 0.25 0.125
		 0 0.175 0 0.22499999 0 0.27500001 0 0.32500002 0 0.125 0.050000001 0.175 0.050000001
		 0.22499999 0.050000001 0.27500001 0.050000001 0.32500002 0.050000001 0.125 0.1 0.175
		 0.1 0.22499999 0.1 0.27500001 0.1 0.32500002 0.1 0.125 0.15000001 0.175 0.15000001
		 0.22499999 0.15000001 0.27500001 0.15000001 0.32500002 0.15000001 0.125 0.2 0.175
		 0.2 0.22499999 0.2 0.27500001 0.2 0.32500002 0.2 0.125 0.25 0.175 0.25 0.22499999
		 0.25 0.27500001 0.25 0.32500002 0.25;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr ".covm[0]"  0 1 1;
	setAttr ".cdvm[0]"  0 1 1;
	setAttr -s 135 ".pt";
	setAttr ".pt[0]" -type "float3" 0.16111228 0.13103507 -0.13444619 ;
	setAttr ".pt[1]" -type "float3" 0.036190238 0.13103507 -0.13444619 ;
	setAttr ".pt[2]" -type "float3" -0.063627675 0.03276287 -0.020886071 ;
	setAttr ".pt[3]" -type "float3" -0.065767512 0.10145774 -0.10486884 ;
	setAttr ".pt[4]" -type "float3" -0.13153505 0.10145774 -0.10486884 ;
	setAttr ".pt[5]" -type "float3" 0.014375246 0.065996386 -0.11619309 ;
	setAttr ".pt[6]" -type "float3" 0.16111228 0.006113003 -0.13444619 ;
	setAttr ".pt[7]" -type "float3" -0.027437443 -0.062581845 -0.050463472 ;
	setAttr ".pt[8]" -type "float3" -0.063627675 -0.033004556 -0.020886071 ;
	setAttr ".pt[9]" -type "float3" -0.12939513 -0.033004556 -0.020886071 ;
	setAttr ".pt[10]" -type "float3" -0.16592315 0.12407243 -0.090987422 ;
	setAttr ".pt[12]" -type "float3" 0.1544477 0.0042919731 -0.16215071 ;
	setAttr ".pt[13]" -type "float3" 0.0021398477 -0.064402878 -0.078168012 ;
	setAttr ".pt[14]" -type "float3" -0.063627675 -0.098772079 -0.020886071 ;
	setAttr ".pt[15]" -type "float3" -0.10015579 0.058304954 -0.090987422 ;
	setAttr ".pt[16]" -type "float3" -0.16592315 0.058304954 -0.090987422 ;
	setAttr ".pt[17]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[18]" -type "float3" 0.1544477 -0.084388271 -0.16215071 ;
	setAttr ".pt[19]" -type "float3" 0.065767527 -0.084388271 -0.16215071 ;
	setAttr ".pt[21]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[22]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[23]" -type "float3" -0.034388263 0.16596857 0.1147588 ;
	setAttr ".pt[24]" -type "float3" -0.011679985 0.02319162 -0.16180705 ;
	setAttr ".pt[25]" -type "float3" 1.3904201e-09 -0.017069468 0.085371204 ;
	setAttr ".pt[27]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[28]" -type "float3" -0.096310012 0.017633677 -0.080420963 ;
	setAttr ".pt[29]" -type "float3" -0.034388263 0.088382147 -0.14129144 ;
	setAttr ".pt[30]" -type "float3" 0.037095115 -0.04026109 -0.10811942 ;
	setAttr ".pt[31]" -type "float3" 0 0.25618026 0 ;
	setAttr ".pt[32]" -type "float3" -0.01602318 -0.10482258 0.039413482 ;
	setAttr ".pt[33]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[34]" -type "float3" -0.096310012 -0.17675723 -0.080420963 ;
	setAttr ".pt[35]" -type "float3" -0.034388263 0.19056039 -0.14129144 ;
	setAttr ".pt[36]" -type "float3" 0.037095115 -0.04026109 -0.033929154 ;
	setAttr ".pt[37]" -type "float3" 0 0.28092566 0 ;
	setAttr ".pt[39]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[40]" -type "float3" -0.096310012 0.14222147 -0.080420963 ;
	setAttr ".pt[41]" -type "float3" -0.034388263 0.19647354 -0.063705027 ;
	setAttr ".pt[42]" -type "float3" 0.058570176 -0.072473697 0.029523561 ;
	setAttr ".pt[43]" -type "float3" -0.10492495 0.28442383 -0.017267179 ;
	setAttr ".pt[45]" -type "float3" 0 0.37176973 0 ;
	setAttr ".pt[46]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".pt[47]" -type "float3" -0.034388263 0.010795741 0.013881362 ;
	setAttr ".pt[48]" -type "float3" -0.0092595685 0.0034981754 0.078398116 ;
	setAttr ".pt[49]" -type "float3" -0.10492495 0.0034981754 0.078398116 ;
	setAttr ".pt[50]" -type "float3" -0.10196877 0.024763469 -0.029721279 ;
	setAttr ".pt[51]" -type "float3" 0 0.37176973 0 ;
	setAttr ".pt[53]" -type "float3" -0.13134015 -0.093924895 0.013907236 ;
	setAttr ".pt[54]" -type "float3" -0.033690818 0.024763469 0.0044176597 ;
	setAttr ".pt[55]" -type "float3" -0.067829758 0.024763469 0.0044176597 ;
	setAttr ".pt[56]" -type "float3" -0.10196877 0.024763469 0.0044176597 ;
	setAttr ".pt[57]" -type "float3" 0 0.37176973 0 ;
	setAttr ".pt[58]" -type "float3" -0.031991471 0.39403597 0.012600123 ;
	setAttr ".pt[59]" -type "float3" -0.096951902 -0.18230703 0.11737242 ;
	setAttr ".pt[60]" -type "float3" 0.038862303 0.038120162 0.058069367 ;
	setAttr ".pt[61]" -type "float3" -0.022333665 0.076545551 0.075711735 ;
	setAttr ".pt[62]" -type "float3" -0.10196877 0.024763469 0.03855658 ;
	setAttr ".pt[63]" -type "float3" -0.067829758 0.27489522 -0.046790753 ;
	setAttr ".pt[64]" -type "float3" -0.031991471 -0.12992086 0.077560544 ;
	setAttr ".pt[65]" -type "float3" -0.096951902 -0.12992086 0.077560544 ;
	setAttr ".pt[66]" -type "float3" -0.033690818 0.058902401 0.03855658 ;
	setAttr ".pt[67]" -type "float3" -0.067829758 0.058902401 0.03855658 ;
	setAttr ".pt[68]" -type "float3" -0.10196877 0.058902401 0.03855658 ;
	setAttr ".pt[69]" -type "float3" -0.033501152 -0.070573777 -0.30986285 ;
	setAttr ".pt[70]" -type "float3" -0.031991471 -0.064960428 0.077560544 ;
	setAttr ".pt[71]" -type "float3" -0.096951902 -0.064960428 0.077560544 ;
	setAttr ".pt[72]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".pt[73]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".pt[74]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".pt[75]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".pt[76]" -type "float3" -0.031991471 -4.7488653e-09 0.077560544 ;
	setAttr ".pt[77]" -type "float3" -0.096951902 -4.7488653e-09 0.077560544 ;
	setAttr ".pt[78]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".pt[79]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".pt[80]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".pt[82]" -type "float3" -0.031991471 0.06496042 0.077560544 ;
	setAttr ".pt[83]" -type "float3" -0.096951902 0.06496042 0.077560544 ;
	setAttr ".pt[84]" -type "float3" 0.10762868 0.091413185 0.041285496 ;
	setAttr ".pt[85]" -type "float3" 0.031996828 0.091413185 0.041285496 ;
	setAttr ".pt[88]" -type "float3" -0.026883563 0.09516447 -0.041780114 ;
	setAttr ".pt[89]" -type "float3" -0.08728639 0.32937536 0.12567054 ;
	setAttr ".pt[90]" -type "float3" 0.10762868 0.16704515 0.041285496 ;
	setAttr ".pt[91]" -type "float3" 0.031996828 0.16704515 0.041285496 ;
	setAttr ".pt[94]" -type "float3" -0.026883563 -0.021418631 0.12567054 ;
	setAttr ".pt[95]" -type "float3" -0.16293117 0.1965775 -0.036707304 ;
	setAttr ".pt[96]" -type "float3" 0.10762868 0.16704515 -0.034346431 ;
	setAttr ".pt[97]" -type "float3" 0.031996828 0.16704515 -0.034346431 ;
	setAttr ".pt[99]" -type "float3" 0.033519272 -0.25638655 0.0652676 ;
	setAttr ".pt[100]" -type "float3" -0.026883563 0.1555673 0.0652676 ;
	setAttr ".pt[101]" -type "float3" -0.08728639 0.1555673 0.0652676 ;
	setAttr ".pt[102]" -type "float3" 0.12341458 0.05626452 -0.078938812 ;
	setAttr ".pt[103]" -type "float3" 0.040386852 0.12683834 0.06705296 ;
	setAttr ".pt[105]" -type "float3" 0.060402833 0.030201415 -0.030201413 ;
	setAttr ".pt[106]" -type "float3" -0.026883563 0.1555673 0.0048647886 ;
	setAttr ".pt[107]" -type "float3" -0.08728639 0.1555673 0.0048647886 ;
	setAttr ".pt[108]" -type "float3" 0.15691555 0.12683834 -0.049475875 ;
	setAttr ".pt[109]" -type "float3" 0.040386852 0.12683834 -0.049475875 ;
	setAttr ".pt[110]" -type "float3" 0.089886867 -0.19914629 0.026666105 ;
	setAttr ".pt[111]" -type "float3" 0 0.12273279 0 ;
	setAttr ".pt[112]" -type "float3" 0.030498641 -0.17656311 -0.055538081 ;
	setAttr ".pt[113]" -type "float3" -0.060402829 0.12963988 -0.090604298 ;
	setAttr ".pt[114]" -type "float3" 0.16111228 0.13103507 -0.0095241377 ;
	setAttr ".pt[115]" -type "float3" 0.065767527 0.10145774 -0.039101411 ;
	setAttr ".pt[116]" -type "float3" 4.8464752e-09 0.10145774 -0.039101411 ;
	setAttr ".pt[117]" -type "float3" -0.065767512 0.10145774 -0.039101411 ;
	setAttr ".pt[119]" -type "float3" 0.0079486659 0.045170072 -0.039372016 ;
	setAttr ".pt[120]" -type "float3" -0.08728639 0.09516447 0.0652676 ;
	setAttr ".pt[121]" -type "float3" -0.096951902 0.12992086 -0.052360304 ;
	setAttr ".pt[123]" -type "float3" 0.17120837 0 0 ;
	setAttr ".pt[124]" -type "float3" -0.096951902 0.06496042 0.012600123 ;
	setAttr ".pt[125]" -type "float3" -0.096951902 0.06496042 -0.052360304 ;
	setAttr ".pt[128]" -type "float3" -0.096951902 0 0.012600123 ;
	setAttr ".pt[129]" -type "float3" -0.16026531 0 -0.052360304 ;
	setAttr ".pt[130]" -type "float3" 0.092194259 0 0 ;
	setAttr ".pt[131]" -type "float3" 0.01379323 0.10024706 0.13376367 ;
	setAttr ".pt[132]" -type "float3" -0.096951902 -0.064960428 0.012600123 ;
	setAttr ".pt[133]" -type "float3" -0.096951902 -0.064960428 -0.052360304 ;
	setAttr ".pt[134]" -type "float3" -0.034388263 0.088382147 0.013881368 ;
	setAttr ".pt[135]" -type "float3" -0.034388263 0.088382147 -0.063705027 ;
	setAttr ".pt[136]" -type "float3" 0.004314776 -0.10838974 -0.10817581 ;
	setAttr ".pt[137]" -type "float3" 0.063705198 0.11166219 0.045642763 ;
	setAttr ".pt[138]" -type "float3" 0.063705198 0.11166219 -0.020124633 ;
	setAttr ".pt[139]" -type "float3" 0.16111228 0.006113003 -0.0095241377 ;
	setAttr ".pt[140]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".pt[141]" -type "float3" 7.7516306e-05 -0.02280019 0.12962551 ;
	setAttr ".pt[142]" -type "float3" 7.7516306e-05 -0.02280019 0.063858166 ;
	setAttr ".pt[143]" -type "float3" 0.022990191 0.011568995 -0.03627855 ;
	setAttr ".pt[144]" -type "float3" -0.13145739 0.0072770226 0.037192047 ;
	setAttr ".pt[145]" -type "float3" 0.022990191 -0.077111244 0.14108196 ;
	setAttr ".pt[146]" -type "float3" 0.022990191 -0.077111244 0.052401774 ;
	setAttr ".pt[147]" -type "float3" 0.086617842 -0.0084163863 -0.12026131 ;
	setAttr ".pt[148]" -type "float3" -0.033690818 0.058902401 0.0044176597 ;
	setAttr ".pt[149]" -type "float3" -0.033690818 0.058902401 -0.029721279 ;
	setAttr ".pt[150]" -type "float3" -0.033690818 0.058902401 -0.0638602 ;
	setAttr ".pt[151]" -type "float3" -0.0092595685 0.099163517 -0.11293253 ;
	setAttr -s 152 ".vt[0:151]"  -0.5 -0.5 0.5 -0.30000001 -0.5 0.5 -0.10000001 -0.5 0.5
		 0.099999994 -0.5 0.5 0.30000001 -0.5 0.5 0.5 -0.5 0.5 -0.5 -0.30000001 0.5 -0.30000001 -0.30000001 0.5
		 -0.10000001 -0.30000001 0.5 0.099999994 -0.30000001 0.5 0.30000001 -0.30000001 0.5
		 0.5 -0.30000001 0.5 -0.5 -0.10000001 0.5 -0.30000001 -0.10000001 0.5 -0.10000001 -0.10000001 0.5
		 0.099999994 -0.10000001 0.5 0.30000001 -0.10000001 0.5 0.5 -0.10000001 0.5 -0.5 0.099999994 0.5
		 -0.30000001 0.099999994 0.5 -0.10000001 0.099999994 0.5 0.099999994 0.099999994 0.5
		 0.30000001 0.099999994 0.5 0.5 0.099999994 0.5 -0.5 0.30000001 0.5 -0.30000001 0.30000001 0.5
		 -0.10000001 0.30000001 0.5 0.099999994 0.30000001 0.5 0.30000001 0.30000001 0.5 0.5 0.30000001 0.5
		 -0.5 0.5 0.5 -0.30000001 0.5 0.5 -0.10000001 0.5 0.5 0.099999994 0.5 0.5 0.30000001 0.5 0.5
		 0.5 0.5 0.5 -0.5 0.5 0.30000001 -0.30000001 0.5 0.30000001 -0.10000001 0.5 0.30000001
		 0.099999994 0.5 0.30000001 0.30000001 0.5 0.30000001 0.5 0.5 0.30000001 -0.5 0.5 0.10000001
		 -0.30000001 0.5 0.10000001 -0.10000001 0.5 0.10000001 0.099999994 0.5 0.10000001
		 0.30000001 0.5 0.10000001 0.5 0.5 0.10000001 -0.5 0.5 -0.099999994 -0.30000001 0.5 -0.099999994
		 -0.10000001 0.5 -0.099999994 0.099999994 0.5 -0.099999994 0.30000001 0.5 -0.099999994
		 0.5 0.5 -0.099999994 -0.5 0.5 -0.30000001 -0.30000001 0.5 -0.30000001 -0.10000001 0.5 -0.30000001
		 0.099999994 0.5 -0.30000001 0.30000001 0.5 -0.30000001 0.5 0.5 -0.30000001 -0.5 0.5 -0.5
		 -0.30000001 0.5 -0.5 -0.10000001 0.5 -0.5 0.099999994 0.5 -0.5 0.30000001 0.5 -0.5
		 0.5 0.5 -0.5 -0.5 0.30000001 -0.5 -0.30000001 0.30000001 -0.5 -0.10000001 0.30000001 -0.5
		 0.099999994 0.30000001 -0.5 0.30000001 0.30000001 -0.5 0.5 0.30000001 -0.5 -0.5 0.10000001 -0.5
		 -0.30000001 0.10000001 -0.5 -0.10000001 0.10000001 -0.5 0.099999994 0.10000001 -0.5
		 0.30000001 0.10000001 -0.5 0.5 0.10000001 -0.5 -0.5 -0.099999994 -0.5 -0.30000001 -0.099999994 -0.5
		 -0.10000001 -0.099999994 -0.5 0.099999994 -0.099999994 -0.5 0.30000001 -0.099999994 -0.5
		 0.5 -0.099999994 -0.5 -0.5 -0.30000001 -0.5 -0.30000001 -0.30000001 -0.5 -0.10000001 -0.30000001 -0.5
		 0.099999994 -0.30000001 -0.5 0.30000001 -0.30000001 -0.5 0.5 -0.30000001 -0.5 -0.5 -0.5 -0.5
		 -0.30000001 -0.5 -0.5 -0.10000001 -0.5 -0.5 0.099999994 -0.5 -0.5 0.30000001 -0.5 -0.5
		 0.5 -0.5 -0.5 -0.5 -0.5 -0.30000001 -0.30000001 -0.5 -0.30000001 -0.10000001 -0.5 -0.30000001
		 0.099999994 -0.5 -0.30000001 0.30000001 -0.5 -0.30000001 0.5 -0.5 -0.30000001 -0.5 -0.5 -0.10000001
		 -0.30000001 -0.5 -0.10000001 -0.10000001 -0.5 -0.10000001 0.099999994 -0.5 -0.10000001
		 0.30000001 -0.5 -0.10000001 0.5 -0.5 -0.10000001 -0.5 -0.5 0.099999994 -0.30000001 -0.5 0.099999994
		 -0.10000001 -0.5 0.099999994 0.099999994 -0.5 0.099999994 0.30000001 -0.5 0.099999994
		 0.5 -0.5 0.099999994 -0.5 -0.5 0.30000001 -0.30000001 -0.5 0.30000001 -0.10000001 -0.5 0.30000001
		 0.099999994 -0.5 0.30000001 0.30000001 -0.5 0.30000001 0.5 -0.5 0.30000001 0.5 -0.30000001 -0.30000001
		 0.5 -0.30000001 -0.10000001 0.5 -0.30000001 0.099999994 0.5 -0.30000001 0.30000001
		 0.5 -0.10000001 -0.30000001 0.5 -0.10000001 -0.10000001 0.5 -0.10000001 0.099999994
		 0.5 -0.10000001 0.30000001 0.5 0.099999994 -0.30000001 0.5 0.099999994 -0.10000001
		 0.5 0.099999994 0.099999994 0.5 0.099999994 0.30000001 0.5 0.30000001 -0.30000001
		 0.5 0.30000001 -0.10000001 0.5 0.30000001 0.099999994 0.5 0.30000001 0.30000001 -0.5 -0.30000001 -0.30000001
		 -0.5 -0.30000001 -0.10000001 -0.5 -0.30000001 0.099999994 -0.5 -0.30000001 0.30000001
		 -0.5 -0.10000001 -0.30000001 -0.5 -0.10000001 -0.10000001 -0.5 -0.10000001 0.099999994
		 -0.5 -0.10000001 0.30000001 -0.5 0.099999994 -0.30000001 -0.5 0.099999994 -0.10000001
		 -0.5 0.099999994 0.099999994 -0.5 0.099999994 0.30000001 -0.5 0.30000001 -0.30000001
		 -0.5 0.30000001 -0.10000001 -0.5 0.30000001 0.099999994 -0.5 0.30000001 0.30000001;
	setAttr -s 300 ".ed";
	setAttr ".ed[0:165]"  0 1 0 1 2 0 2 3 0 3 4 0 4 5 0 6 7 1 7 8 1 8 9 1 9 10 1
		 10 11 1 12 13 1 13 14 1 14 15 1 15 16 1 16 17 1 18 19 1 19 20 1 20 21 1 21 22 1 22 23 1
		 24 25 1 25 26 1 26 27 1 27 28 1 28 29 1 30 31 0 31 32 0 32 33 0 33 34 0 34 35 0 36 37 1
		 37 38 1 38 39 1 39 40 1 40 41 1 42 43 1 43 44 1 44 45 1 45 46 1 46 47 1 48 49 1 49 50 1
		 50 51 1 51 52 1 52 53 1 54 55 1 55 56 1 56 57 1 57 58 1 58 59 1 60 61 0 61 62 0 62 63 0
		 63 64 0 64 65 0 66 67 1 67 68 1 68 69 1 69 70 1 70 71 1 72 73 1 73 74 1 74 75 1 75 76 1
		 76 77 1 78 79 1 79 80 1 80 81 1 81 82 1 82 83 1 84 85 1 85 86 1 86 87 1 87 88 1 88 89 1
		 90 91 0 91 92 0 92 93 0 93 94 0 94 95 0 96 97 1 97 98 1 98 99 1 99 100 1 100 101 1
		 102 103 1 103 104 1 104 105 1 105 106 1 106 107 1 108 109 1 109 110 1 110 111 1 111 112 1
		 112 113 1 114 115 1 115 116 1 116 117 1 117 118 1 118 119 1 0 6 0 1 7 1 2 8 1 3 9 1
		 4 10 1 5 11 0 6 12 0 7 13 1 8 14 1 9 15 1 10 16 1 11 17 0 12 18 0 13 19 1 14 20 1
		 15 21 1 16 22 1 17 23 0 18 24 0 19 25 1 20 26 1 21 27 1 22 28 1 23 29 0 24 30 0 25 31 1
		 26 32 1 27 33 1 28 34 1 29 35 0 30 36 0 31 37 1 32 38 1 33 39 1 34 40 1 35 41 0 36 42 0
		 37 43 1 38 44 1 39 45 1 40 46 1 41 47 0 42 48 0 43 49 1 44 50 1 45 51 1 46 52 1 47 53 0
		 48 54 0 49 55 1 50 56 1 51 57 1 52 58 1 53 59 0 54 60 0 55 61 1 56 62 1 57 63 1 58 64 1
		 59 65 0 60 66 0 61 67 1 62 68 1 63 69 1 64 70 1 65 71 0;
	setAttr ".ed[166:299]" 66 72 0 67 73 1 68 74 1 69 75 1 70 76 1 71 77 0 72 78 0
		 73 79 1 74 80 1 75 81 1 76 82 1 77 83 0 78 84 0 79 85 1 80 86 1 81 87 1 82 88 1 83 89 0
		 84 90 0 85 91 1 86 92 1 87 93 1 88 94 1 89 95 0 90 96 0 91 97 1 92 98 1 93 99 1 94 100 1
		 95 101 0 96 102 0 97 103 1 98 104 1 99 105 1 100 106 1 101 107 0 102 108 0 103 109 1
		 104 110 1 105 111 1 106 112 1 107 113 0 108 114 0 109 115 1 110 116 1 111 117 1 112 118 1
		 113 119 0 114 0 0 115 1 1 116 2 1 117 3 1 118 4 1 119 5 0 89 120 1 120 121 1 121 122 1
		 122 123 1 123 11 1 83 124 1 124 125 1 125 126 1 126 127 1 127 17 1 77 128 1 128 129 1
		 129 130 1 130 131 1 131 23 1 71 132 1 132 133 1 133 134 1 134 135 1 135 29 1 101 120 1
		 107 121 1 113 122 1 119 123 1 120 124 1 121 125 1 122 126 1 123 127 1 124 128 1 125 129 1
		 126 130 1 127 131 1 128 132 1 129 133 1 130 134 1 131 135 1 132 59 1 133 53 1 134 47 1
		 135 41 1 84 136 1 136 137 1 137 138 1 138 139 1 139 6 1 78 140 1 140 141 1 141 142 1
		 142 143 1 143 12 1 72 144 1 144 145 1 145 146 1 146 147 1 147 18 1 66 148 1 148 149 1
		 149 150 1 150 151 1 151 24 1 96 136 1 102 137 1 108 138 1 114 139 1 136 140 1 137 141 1
		 138 142 1 139 143 1 140 144 1 141 145 1 142 146 1 143 147 1 144 148 1 145 149 1 146 150 1
		 147 151 1 148 54 1 149 48 1 150 42 1 151 36 1;
	setAttr -s 150 -ch 600 ".fc[0:149]" -type "polyFaces" 
		f 4 0 101 -6 -101
		mu 0 4 0 1 7 6
		f 4 1 102 -7 -102
		mu 0 4 1 2 8 7
		f 4 2 103 -8 -103
		mu 0 4 2 3 9 8
		f 4 3 104 -9 -104
		mu 0 4 3 4 10 9
		f 4 4 105 -10 -105
		mu 0 4 4 5 11 10
		f 4 5 107 -11 -107
		mu 0 4 6 7 13 12
		f 4 6 108 -12 -108
		mu 0 4 7 8 14 13
		f 4 7 109 -13 -109
		mu 0 4 8 9 15 14
		f 4 8 110 -14 -110
		mu 0 4 9 10 16 15
		f 4 9 111 -15 -111
		mu 0 4 10 11 17 16
		f 4 10 113 -16 -113
		mu 0 4 12 13 19 18
		f 4 11 114 -17 -114
		mu 0 4 13 14 20 19
		f 4 12 115 -18 -115
		mu 0 4 14 15 21 20
		f 4 13 116 -19 -116
		mu 0 4 15 16 22 21
		f 4 14 117 -20 -117
		mu 0 4 16 17 23 22
		f 4 15 119 -21 -119
		mu 0 4 18 19 25 24
		f 4 16 120 -22 -120
		mu 0 4 19 20 26 25
		f 4 17 121 -23 -121
		mu 0 4 20 21 27 26
		f 4 18 122 -24 -122
		mu 0 4 21 22 28 27
		f 4 19 123 -25 -123
		mu 0 4 22 23 29 28
		f 4 20 125 -26 -125
		mu 0 4 24 25 31 30
		f 4 21 126 -27 -126
		mu 0 4 25 26 32 31
		f 4 22 127 -28 -127
		mu 0 4 26 27 33 32
		f 4 23 128 -29 -128
		mu 0 4 27 28 34 33
		f 4 24 129 -30 -129
		mu 0 4 28 29 35 34
		f 4 25 131 -31 -131
		mu 0 4 30 31 37 36
		f 4 26 132 -32 -132
		mu 0 4 31 32 38 37
		f 4 27 133 -33 -133
		mu 0 4 32 33 39 38
		f 4 28 134 -34 -134
		mu 0 4 33 34 40 39
		f 4 29 135 -35 -135
		mu 0 4 34 35 41 40
		f 4 30 137 -36 -137
		mu 0 4 36 37 43 42
		f 4 31 138 -37 -138
		mu 0 4 37 38 44 43
		f 4 32 139 -38 -139
		mu 0 4 38 39 45 44
		f 4 33 140 -39 -140
		mu 0 4 39 40 46 45
		f 4 34 141 -40 -141
		mu 0 4 40 41 47 46
		f 4 35 143 -41 -143
		mu 0 4 42 43 49 48
		f 4 36 144 -42 -144
		mu 0 4 43 44 50 49
		f 4 37 145 -43 -145
		mu 0 4 44 45 51 50
		f 4 38 146 -44 -146
		mu 0 4 45 46 52 51
		f 4 39 147 -45 -147
		mu 0 4 46 47 53 52
		f 4 40 149 -46 -149
		mu 0 4 48 49 55 54
		f 4 41 150 -47 -150
		mu 0 4 49 50 56 55
		f 4 42 151 -48 -151
		mu 0 4 50 51 57 56
		f 4 43 152 -49 -152
		mu 0 4 51 52 58 57
		f 4 44 153 -50 -153
		mu 0 4 52 53 59 58
		f 4 45 155 -51 -155
		mu 0 4 54 55 61 60
		f 4 46 156 -52 -156
		mu 0 4 55 56 62 61
		f 4 47 157 -53 -157
		mu 0 4 56 57 63 62
		f 4 48 158 -54 -158
		mu 0 4 57 58 64 63
		f 4 49 159 -55 -159
		mu 0 4 58 59 65 64
		f 4 50 161 -56 -161
		mu 0 4 60 61 67 66
		f 4 51 162 -57 -162
		mu 0 4 61 62 68 67
		f 4 52 163 -58 -163
		mu 0 4 62 63 69 68
		f 4 53 164 -59 -164
		mu 0 4 63 64 70 69
		f 4 54 165 -60 -165
		mu 0 4 64 65 71 70
		f 4 55 167 -61 -167
		mu 0 4 66 67 73 72
		f 4 56 168 -62 -168
		mu 0 4 67 68 74 73
		f 4 57 169 -63 -169
		mu 0 4 68 69 75 74
		f 4 58 170 -64 -170
		mu 0 4 69 70 76 75
		f 4 59 171 -65 -171
		mu 0 4 70 71 77 76
		f 4 60 173 -66 -173
		mu 0 4 72 73 79 78
		f 4 61 174 -67 -174
		mu 0 4 73 74 80 79
		f 4 62 175 -68 -175
		mu 0 4 74 75 81 80
		f 4 63 176 -69 -176
		mu 0 4 75 76 82 81
		f 4 64 177 -70 -177
		mu 0 4 76 77 83 82
		f 4 65 179 -71 -179
		mu 0 4 78 79 85 84
		f 4 66 180 -72 -180
		mu 0 4 79 80 86 85
		f 4 67 181 -73 -181
		mu 0 4 80 81 87 86
		f 4 68 182 -74 -182
		mu 0 4 81 82 88 87
		f 4 69 183 -75 -183
		mu 0 4 82 83 89 88
		f 4 70 185 -76 -185
		mu 0 4 84 85 91 90
		f 4 71 186 -77 -186
		mu 0 4 85 86 92 91
		f 4 72 187 -78 -187
		mu 0 4 86 87 93 92
		f 4 73 188 -79 -188
		mu 0 4 87 88 94 93
		f 4 74 189 -80 -189
		mu 0 4 88 89 95 94
		f 4 75 191 -81 -191
		mu 0 4 90 91 97 96
		f 4 76 192 -82 -192
		mu 0 4 91 92 98 97
		f 4 77 193 -83 -193
		mu 0 4 92 93 99 98
		f 4 78 194 -84 -194
		mu 0 4 93 94 100 99
		f 4 79 195 -85 -195
		mu 0 4 94 95 101 100
		f 4 80 197 -86 -197
		mu 0 4 96 97 103 102
		f 4 81 198 -87 -198
		mu 0 4 97 98 104 103
		f 4 82 199 -88 -199
		mu 0 4 98 99 105 104
		f 4 83 200 -89 -200
		mu 0 4 99 100 106 105
		f 4 84 201 -90 -201
		mu 0 4 100 101 107 106
		f 4 85 203 -91 -203
		mu 0 4 102 103 109 108
		f 4 86 204 -92 -204
		mu 0 4 103 104 110 109
		f 4 87 205 -93 -205
		mu 0 4 104 105 111 110
		f 4 88 206 -94 -206
		mu 0 4 105 106 112 111
		f 4 89 207 -95 -207
		mu 0 4 106 107 113 112
		f 4 90 209 -96 -209
		mu 0 4 108 109 115 114
		f 4 91 210 -97 -210
		mu 0 4 109 110 116 115
		f 4 92 211 -98 -211
		mu 0 4 110 111 117 116
		f 4 93 212 -99 -212
		mu 0 4 111 112 118 117
		f 4 94 213 -100 -213
		mu 0 4 112 113 119 118
		f 4 95 215 -1 -215
		mu 0 4 114 115 121 120
		f 4 96 216 -2 -216
		mu 0 4 115 116 122 121
		f 4 97 217 -3 -217
		mu 0 4 116 117 123 122
		f 4 98 218 -4 -218
		mu 0 4 117 118 124 123
		f 4 99 219 -5 -219
		mu 0 4 118 119 125 124
		f 4 -196 -190 220 -241
		mu 0 4 127 126 131 132
		f 4 -202 240 221 -242
		mu 0 4 128 127 132 133
		f 4 -208 241 222 -243
		mu 0 4 129 128 133 134
		f 4 -214 242 223 -244
		mu 0 4 130 129 134 135
		f 4 -220 243 224 -106
		mu 0 4 5 130 135 11
		f 4 -221 -184 225 -245
		mu 0 4 132 131 136 137
		f 4 -222 244 226 -246
		mu 0 4 133 132 137 138
		f 4 -223 245 227 -247
		mu 0 4 134 133 138 139
		f 4 -224 246 228 -248
		mu 0 4 135 134 139 140
		f 4 -225 247 229 -112
		mu 0 4 11 135 140 17
		f 4 -226 -178 230 -249
		mu 0 4 137 136 141 142
		f 4 -227 248 231 -250
		mu 0 4 138 137 142 143
		f 4 -228 249 232 -251
		mu 0 4 139 138 143 144
		f 4 -229 250 233 -252
		mu 0 4 140 139 144 145
		f 4 -230 251 234 -118
		mu 0 4 17 140 145 23
		f 4 -231 -172 235 -253
		mu 0 4 142 141 146 147
		f 4 -232 252 236 -254
		mu 0 4 143 142 147 148
		f 4 -233 253 237 -255
		mu 0 4 144 143 148 149
		f 4 -234 254 238 -256
		mu 0 4 145 144 149 150
		f 4 -235 255 239 -124
		mu 0 4 23 145 150 29
		f 4 -236 -166 -160 -257
		mu 0 4 147 146 151 152
		f 4 -237 256 -154 -258
		mu 0 4 148 147 152 153
		f 4 -238 257 -148 -259
		mu 0 4 149 148 153 154
		f 4 -239 258 -142 -260
		mu 0 4 150 149 154 155
		f 4 -240 259 -136 -130
		mu 0 4 29 150 155 35
		f 4 190 280 -261 184
		mu 0 4 156 157 162 161
		f 4 196 281 -262 -281
		mu 0 4 157 158 163 162
		f 4 202 282 -263 -282
		mu 0 4 158 159 164 163
		f 4 208 283 -264 -283
		mu 0 4 159 160 165 164
		f 4 214 100 -265 -284
		mu 0 4 160 0 6 165
		f 4 260 284 -266 178
		mu 0 4 161 162 167 166
		f 4 261 285 -267 -285
		mu 0 4 162 163 168 167
		f 4 262 286 -268 -286
		mu 0 4 163 164 169 168
		f 4 263 287 -269 -287
		mu 0 4 164 165 170 169
		f 4 264 106 -270 -288
		mu 0 4 165 6 12 170
		f 4 265 288 -271 172
		mu 0 4 166 167 172 171
		f 4 266 289 -272 -289
		mu 0 4 167 168 173 172
		f 4 267 290 -273 -290
		mu 0 4 168 169 174 173
		f 4 268 291 -274 -291
		mu 0 4 169 170 175 174
		f 4 269 112 -275 -292
		mu 0 4 170 12 18 175
		f 4 270 292 -276 166
		mu 0 4 171 172 177 176
		f 4 271 293 -277 -293
		mu 0 4 172 173 178 177
		f 4 272 294 -278 -294
		mu 0 4 173 174 179 178
		f 4 273 295 -279 -295
		mu 0 4 174 175 180 179
		f 4 274 118 -280 -296
		mu 0 4 175 18 24 180
		f 4 275 296 154 160
		mu 0 4 176 177 182 181
		f 4 276 297 148 -297
		mu 0 4 177 178 183 182
		f 4 277 298 142 -298
		mu 0 4 178 179 184 183
		f 4 278 299 136 -299
		mu 0 4 179 180 185 184
		f 4 279 124 130 -300
		mu 0 4 180 24 30 185;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
	setAttr ".pd[0]" -type "dataPolyComponent" Index_Data UV 0 ;
	setAttr ".hfd" -type "dataPolyComponent" Index_Data Face 0 ;
	setAttr ".dr" 3;
	setAttr ".dsm" 2;
	setAttr ".ai_translator" -type "string" "polymesh";
createNode lightLinker -s -n "lightLinker1";
	rename -uid "23A54561-4395-7A6C-C316-E99ECEDA58CB";
	setAttr -s 2 ".lnk";
	setAttr -s 2 ".slnk";
createNode shapeEditorManager -n "shapeEditorManager";
	rename -uid "DC0D9DDC-4A60-CE83-A2AB-91B3997ECD83";
createNode poseInterpolatorManager -n "poseInterpolatorManager";
	rename -uid "1C98A0AE-4B43-52BD-81F0-C79126F733AE";
createNode displayLayerManager -n "layerManager";
	rename -uid "940E5AD9-40D5-604B-8AA3-F7ACB7D9F5C1";
createNode displayLayer -n "defaultLayer";
	rename -uid "B4D2DCF0-4E38-1256-1993-51BA14E33D53";
createNode renderLayerManager -n "renderLayerManager";
	rename -uid "7AFAE6F0-4732-6EDE-BFF1-508295FF7396";
createNode renderLayer -n "defaultRenderLayer";
	rename -uid "3E324111-449A-3E35-D796-8A87FA9D9BE8";
	setAttr ".g" yes;
createNode script -n "uiConfigurationScriptNode";
	rename -uid "8AC5884D-483E-8471-84BE-45B2DF55A1A5";
	setAttr ".b" -type "string" (
		"// Maya Mel UI Configuration File.\n//\n//  This script is machine generated.  Edit at your own risk.\n//\n//\n\nglobal string $gMainPane;\nif (`paneLayout -exists $gMainPane`) {\n\n\tglobal int $gUseScenePanelConfig;\n\tint    $useSceneConfig = $gUseScenePanelConfig;\n\tint    $nodeEditorPanelVisible = stringArrayContains(\"nodeEditorPanel1\", `getPanel -vis`);\n\tint    $nodeEditorWorkspaceControlOpen = (`workspaceControl -exists nodeEditorPanel1Window` && `workspaceControl -q -visible nodeEditorPanel1Window`);\n\tint    $menusOkayInPanels = `optionVar -q allowMenusInPanels`;\n\tint    $nVisPanes = `paneLayout -q -nvp $gMainPane`;\n\tint    $nPanes = 0;\n\tstring $editorName;\n\tstring $panelName;\n\tstring $itemFilterName;\n\tstring $panelConfig;\n\n\t//\n\t//  get current state of the UI\n\t//\n\tsceneUIReplacement -update $gMainPane;\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Top View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"top\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 32768\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n"
		+ "            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n"
		+ "            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Side View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"side\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n"
		+ "            -textureDisplay \"modulate\" \n            -textureMaxSize 32768\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n"
		+ "            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n"
		+ "            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Front View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"front\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n"
		+ "            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 32768\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n"
		+ "            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n"
		+ "            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 1\n            -height 1\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Persp View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"persp\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -ignorePanZoom 0\n"
		+ "            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -holdOuts 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 0\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 32768\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -depthOfFieldPreview 1\n            -maxConstantTransparency 1\n            -rendererName \"vp2Renderer\" \n            -objectFilterShowInHUD 1\n            -isFiltered 0\n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n"
		+ "            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -controllers 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -imagePlane 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -particleInstancers 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n"
		+ "            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -pluginShapes 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -motionTrails 1\n            -clipGhosts 1\n            -greasePencils 1\n            -shadows 0\n            -captureSequenceNumber -1\n            -width 2941\n            -height 1581\n            -sceneRenderFilter 0\n            $editorName;\n        modelEditor -e -viewSelected 0 $editorName;\n        modelEditor -e \n            -pluginObjects \"gpuCacheDisplayFilter\" 1 \n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"ToggledOutliner\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"ToggledOutliner\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -docTag \"isolOutln_fromSeln\" \n            -showShapes 0\n            -showAssignedMaterials 0\n            -showTimeEditor 1\n            -showReferenceNodes 1\n            -showReferenceMembers 1\n            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n            -organizeByLayer 1\n            -organizeByClip 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showParentContainers 0\n            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUpstreamCurves 1\n            -showUnitlessCurves 1\n            -showCompounds 1\n            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n"
		+ "            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n            -isSet 0\n            -isSetMember 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n            -niceNames 1\n            -showNamespace 1\n            -showPinIcons 0\n            -mapMotionTrails 0\n            -ignoreHiddenAttribute 0\n            -ignoreOutlinerColor 0\n            -renderFilterVisible 0\n            -renderFilterIndex 0\n            -selectionOrder \"chronological\" \n"
		+ "            -expandAttribute 0\n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"Outliner\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"Outliner\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -showShapes 0\n            -showAssignedMaterials 0\n            -showTimeEditor 1\n            -showReferenceNodes 0\n            -showReferenceMembers 0\n            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n            -organizeByLayer 1\n            -organizeByClip 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showParentContainers 0\n"
		+ "            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUpstreamCurves 1\n            -showUnitlessCurves 1\n            -showCompounds 1\n            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n"
		+ "            -niceNames 1\n            -showNamespace 1\n            -showPinIcons 0\n            -mapMotionTrails 0\n            -ignoreHiddenAttribute 0\n            -ignoreOutlinerColor 0\n            -renderFilterVisible 0\n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"graphEditor\" (localizedPanelLabel(\"Graph Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Graph Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAssignedMaterials 0\n                -showTimeEditor 1\n                -showReferenceNodes 0\n                -showReferenceMembers 0\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -organizeByClip 1\n"
		+ "                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 1\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showParentContainers 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUpstreamCurves 1\n                -showUnitlessCurves 1\n                -showCompounds 0\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 1\n                -doNotSelectNewObjects 0\n                -dropIsParent 1\n                -transmitFilters 1\n                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n"
		+ "                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                -showPinIcons 1\n                -mapMotionTrails 1\n                -ignoreHiddenAttribute 0\n                -ignoreOutlinerColor 0\n                -renderFilterVisible 0\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"GraphEd\");\n            animCurveEditor -e \n                -displayValues 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -showPlayRangeShades \"on\" \n                -lockPlayRangeShades \"off\" \n                -smoothness \"fine\" \n                -resultSamples 1\n                -resultScreenSamples 0\n"
		+ "                -resultUpdate \"delayed\" \n                -showUpstreamCurves 1\n                -stackedCurvesMin -1\n                -stackedCurvesMax 1\n                -stackedCurvesSpace 0.2\n                -preSelectionHighlight 0\n                -constrainDrag 0\n                -valueLinesToggle 1\n                -highlightAffectedCurves 0\n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dopeSheetPanel\" (localizedPanelLabel(\"Dope Sheet\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dope Sheet\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAssignedMaterials 0\n                -showTimeEditor 1\n                -showReferenceNodes 0\n                -showReferenceMembers 0\n                -showAttributes 1\n                -showConnected 1\n"
		+ "                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -organizeByClip 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 0\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showParentContainers 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUpstreamCurves 1\n                -showUnitlessCurves 0\n                -showCompounds 1\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 0\n                -doNotSelectNewObjects 1\n                -dropIsParent 1\n                -transmitFilters 0\n                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n"
		+ "                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                -showPinIcons 0\n                -mapMotionTrails 1\n                -ignoreHiddenAttribute 0\n                -ignoreOutlinerColor 0\n                -renderFilterVisible 0\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"DopeSheetEd\");\n            dopeSheetEditor -e \n                -displayValues 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -outliner \"dopeSheetPanel1OutlineEd\" \n"
		+ "                -showSummary 1\n                -showScene 0\n                -hierarchyBelow 0\n                -showTicks 1\n                -selectionWindow 0 0 0 0 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"timeEditorPanel\" (localizedPanelLabel(\"Time Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Time Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"clipEditorPanel\" (localizedPanelLabel(\"Trax Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Trax Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = clipEditorNameFromPanel($panelName);\n            clipEditor -e \n                -displayValues 0\n                -snapTime \"none\" \n"
		+ "                -snapValue \"none\" \n                -initialized 0\n                -manageSequencer 0 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"sequenceEditorPanel\" (localizedPanelLabel(\"Camera Sequencer\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Camera Sequencer\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = sequenceEditorNameFromPanel($panelName);\n            clipEditor -e \n                -displayValues 0\n                -snapTime \"none\" \n                -snapValue \"none\" \n                -initialized 0\n                -manageSequencer 1 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperGraphPanel\" (localizedPanelLabel(\"Hypergraph Hierarchy\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n"
		+ "\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypergraph Hierarchy\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"HyperGraphEd\");\n            hyperGraph -e \n                -graphLayoutStyle \"hierarchicalLayout\" \n                -orientation \"horiz\" \n                -mergeConnections 0\n                -zoom 1\n                -animateTransition 0\n                -showRelationships 1\n                -showShapes 0\n                -showDeformers 0\n                -showExpressions 0\n                -showConstraints 0\n                -showConnectionFromSelected 0\n                -showConnectionToSelected 0\n                -showConstraintLabels 0\n                -showUnderworld 0\n                -showInvisible 0\n                -transitionFrames 1\n                -opaqueContainers 0\n                -freeform 0\n                -imagePosition 0 0 \n                -imageScale 1\n                -imageEnabled 0\n                -graphType \"DAG\" \n                -heatMapDisplay 0\n                -updateSelection 1\n"
		+ "                -updateNodeAdded 1\n                -useDrawOverrideColor 0\n                -limitGraphTraversal -1\n                -range 0 0 \n                -iconSize \"smallIcons\" \n                -showCachedConnections 0\n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperShadePanel\" (localizedPanelLabel(\"Hypershade\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypershade\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"visorPanel\" (localizedPanelLabel(\"Visor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Visor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"nodeEditorPanel\" (localizedPanelLabel(\"Node Editor\")) `;\n"
		+ "\tif ($nodeEditorPanelVisible || $nodeEditorWorkspaceControlOpen) {\n\t\tif (\"\" == $panelName) {\n\t\t\tif ($useSceneConfig) {\n\t\t\t\t$panelName = `scriptedPanel -unParent  -type \"nodeEditorPanel\" -l (localizedPanelLabel(\"Node Editor\")) -mbv $menusOkayInPanels `;\n\n\t\t\t$editorName = ($panelName+\"NodeEditorEd\");\n            nodeEditor -e \n                -allAttributes 0\n                -allNodes 0\n                -autoSizeNodes 1\n                -consistentNameSize 1\n                -createNodeCommand \"nodeEdCreateNodeCommand\" \n                -connectNodeOnCreation 0\n                -connectOnDrop 0\n                -copyConnectionsOnPaste 0\n                -connectionStyle \"bezier\" \n                -defaultPinnedState 0\n                -additiveGraphingMode 0\n                -settingsChangedCallback \"nodeEdSyncControls\" \n                -traversalDepthLimit -1\n                -keyPressCommand \"nodeEdKeyPressCommand\" \n                -nodeTitleMode \"name\" \n                -gridSnap 0\n                -gridVisibility 1\n                -crosshairOnEdgeDragging 0\n"
		+ "                -popupMenuScript \"nodeEdBuildPanelMenus\" \n                -showNamespace 1\n                -showShapes 1\n                -showSGShapes 0\n                -showTransforms 1\n                -useAssets 1\n                -syncedSelection 1\n                -extendToShapes 1\n                -editorMode \"default\" \n                -hasWatchpoint 0\n                $editorName;\n\t\t\t}\n\t\t} else {\n\t\t\t$label = `panel -q -label $panelName`;\n\t\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Node Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = ($panelName+\"NodeEditorEd\");\n            nodeEditor -e \n                -allAttributes 0\n                -allNodes 0\n                -autoSizeNodes 1\n                -consistentNameSize 1\n                -createNodeCommand \"nodeEdCreateNodeCommand\" \n                -connectNodeOnCreation 0\n                -connectOnDrop 0\n                -copyConnectionsOnPaste 0\n                -connectionStyle \"bezier\" \n                -defaultPinnedState 0\n                -additiveGraphingMode 0\n"
		+ "                -settingsChangedCallback \"nodeEdSyncControls\" \n                -traversalDepthLimit -1\n                -keyPressCommand \"nodeEdKeyPressCommand\" \n                -nodeTitleMode \"name\" \n                -gridSnap 0\n                -gridVisibility 1\n                -crosshairOnEdgeDragging 0\n                -popupMenuScript \"nodeEdBuildPanelMenus\" \n                -showNamespace 1\n                -showShapes 1\n                -showSGShapes 0\n                -showTransforms 1\n                -useAssets 1\n                -syncedSelection 1\n                -extendToShapes 1\n                -editorMode \"default\" \n                -hasWatchpoint 0\n                $editorName;\n\t\t\tif (!$useSceneConfig) {\n\t\t\t\tpanel -e -l $label $panelName;\n\t\t\t}\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"createNodePanel\" (localizedPanelLabel(\"Create Node\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Create Node\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"polyTexturePlacementPanel\" (localizedPanelLabel(\"UV Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"UV Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"renderWindowPanel\" (localizedPanelLabel(\"Render View\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Render View\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"shapePanel\" (localizedPanelLabel(\"Shape Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tshapePanel -edit -l (localizedPanelLabel(\"Shape Editor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"posePanel\" (localizedPanelLabel(\"Pose Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tposePanel -edit -l (localizedPanelLabel(\"Pose Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynRelEdPanel\" (localizedPanelLabel(\"Dynamic Relationships\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dynamic Relationships\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"relationshipPanel\" (localizedPanelLabel(\"Relationship Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Relationship Editor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"referenceEditorPanel\" (localizedPanelLabel(\"Reference Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Reference Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"componentEditorPanel\" (localizedPanelLabel(\"Component Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Component Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynPaintScriptedPanelType\" (localizedPanelLabel(\"Paint Effects\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Paint Effects\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"scriptEditorPanel\" (localizedPanelLabel(\"Script Editor\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Script Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"profilerPanel\" (localizedPanelLabel(\"Profiler Tool\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Profiler Tool\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"contentBrowserPanel\" (localizedPanelLabel(\"Content Browser\")) `;\n\tif (\"\" != $panelName) {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Content Browser\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\tif ($useSceneConfig) {\n        string $configName = `getPanel -cwl (localizedPanelLabel(\"Current Layout\"))`;\n        if (\"\" != $configName) {\n\t\t\tpanelConfiguration -edit -label (localizedPanelLabel(\"Current Layout\")) \n\t\t\t\t-userCreated false\n\t\t\t\t-defaultImage \"vacantCell.xP:/\"\n\t\t\t\t-image \"\"\n\t\t\t\t-sc false\n\t\t\t\t-configString \"global string $gMainPane; paneLayout -e -cn \\\"single\\\" -ps 1 100 100 $gMainPane;\"\n\t\t\t\t-removeAllPanels\n\t\t\t\t-ap false\n\t\t\t\t\t(localizedPanelLabel(\"Persp View\")) \n\t\t\t\t\t\"modelPanel\"\n"
		+ "\t\t\t\t\t\"$panelName = `modelPanel -unParent -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels `;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -ignorePanZoom 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -holdOuts 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 0\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 0\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 32768\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -depthOfFieldPreview 1\\n    -maxConstantTransparency 1\\n    -rendererName \\\"vp2Renderer\\\" \\n    -objectFilterShowInHUD 1\\n    -isFiltered 0\\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -controllers 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 1\\n    -imagePlane 1\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -particleInstancers 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -pluginShapes 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -motionTrails 1\\n    -clipGhosts 1\\n    -greasePencils 1\\n    -shadows 0\\n    -captureSequenceNumber -1\\n    -width 2941\\n    -height 1581\\n    -sceneRenderFilter 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName;\\nmodelEditor -e \\n    -pluginObjects \\\"gpuCacheDisplayFilter\\\" 1 \\n    $editorName\"\n"
		+ "\t\t\t\t\t\"modelPanel -edit -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels  $panelName;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -ignorePanZoom 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -holdOuts 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 0\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 0\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 32768\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -depthOfFieldPreview 1\\n    -maxConstantTransparency 1\\n    -rendererName \\\"vp2Renderer\\\" \\n    -objectFilterShowInHUD 1\\n    -isFiltered 0\\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -controllers 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 1\\n    -imagePlane 1\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -particleInstancers 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -pluginShapes 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -motionTrails 1\\n    -clipGhosts 1\\n    -greasePencils 1\\n    -shadows 0\\n    -captureSequenceNumber -1\\n    -width 2941\\n    -height 1581\\n    -sceneRenderFilter 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName;\\nmodelEditor -e \\n    -pluginObjects \\\"gpuCacheDisplayFilter\\\" 1 \\n    $editorName\"\n"
		+ "\t\t\t\t$configName;\n\n            setNamedPanelLayout (localizedPanelLabel(\"Current Layout\"));\n        }\n\n        panelHistory -e -clear mainPanelHistory;\n        sceneUIReplacement -clear;\n\t}\n\n\ngrid -spacing 5 -size 12 -divisions 5 -displayAxes yes -displayGridLines yes -displayDivisionLines yes -displayPerspectiveLabels no -displayOrthographicLabels no -displayAxesBold yes -perspectiveLabelPosition axis -orthographicLabelPosition edge;\nviewManip -drawCompass 0 -compassAngle 0 -frontParameters \"\" -homeParameters \"\" -selectionLockParameters \"\";\n}\n");
	setAttr ".st" 3;
createNode script -n "sceneConfigurationScriptNode";
	rename -uid "9FE2ED68-4D18-967B-0B8F-8083AF7E2E29";
	setAttr ".b" -type "string" "playbackOptions -min 1 -max 120 -ast 1 -aet 200 ";
	setAttr ".st" 6;
createNode polyCube -n "polyCube1";
	rename -uid "C2845EE2-4A0C-184D-36EA-3A8987351C00";
	setAttr ".sw" 5;
	setAttr ".sh" 5;
	setAttr ".sd" 5;
	setAttr ".cuv" 4;
createNode polySmoothFace -n "polySmoothFace1";
	rename -uid "16F268D8-4F2C-92CF-2142-E8B610A85AEE";
	setAttr ".ics" -type "componentList" 1 "f[*]";
	setAttr ".sdt" 2;
	setAttr ".suv" yes;
	setAttr ".ps" 0.10000000149011612;
	setAttr ".ro" 1;
	setAttr ".ma" yes;
	setAttr ".m08" yes;
createNode polyTweak -n "polyTweak1";
	rename -uid "26C5545D-4892-20EC-5C72-0ABE07BAB202";
	setAttr ".uopa" yes;
	setAttr -s 135 ".tk";
	setAttr ".tk[0]" -type "float3" 0.16111228 0.13103507 -0.13444619 ;
	setAttr ".tk[1]" -type "float3" 0.036190238 0.13103507 -0.13444619 ;
	setAttr ".tk[2]" -type "float3" -0.063627675 0.03276287 -0.020886071 ;
	setAttr ".tk[3]" -type "float3" -0.065767512 0.10145774 -0.10486884 ;
	setAttr ".tk[4]" -type "float3" -0.13153505 0.10145774 -0.10486884 ;
	setAttr ".tk[5]" -type "float3" 0.014375246 0.065996386 -0.11619309 ;
	setAttr ".tk[6]" -type "float3" 0.16111228 0.006113003 -0.13444619 ;
	setAttr ".tk[7]" -type "float3" -0.027437443 -0.062581845 -0.050463472 ;
	setAttr ".tk[8]" -type "float3" -0.063627675 -0.033004556 -0.020886071 ;
	setAttr ".tk[9]" -type "float3" -0.12939513 -0.033004556 -0.020886071 ;
	setAttr ".tk[10]" -type "float3" -0.16592315 0.12407243 -0.090987422 ;
	setAttr ".tk[12]" -type "float3" 0.1544477 0.0042919731 -0.16215071 ;
	setAttr ".tk[13]" -type "float3" 0.0021398477 -0.064402878 -0.078168012 ;
	setAttr ".tk[14]" -type "float3" -0.063627675 -0.098772079 -0.020886071 ;
	setAttr ".tk[15]" -type "float3" -0.10015579 0.058304954 -0.090987422 ;
	setAttr ".tk[16]" -type "float3" -0.16592315 0.058304954 -0.090987422 ;
	setAttr ".tk[17]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[18]" -type "float3" 0.1544477 -0.084388271 -0.16215071 ;
	setAttr ".tk[19]" -type "float3" 0.065767527 -0.084388271 -0.16215071 ;
	setAttr ".tk[21]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[22]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[23]" -type "float3" -0.034388263 0.16596857 0.1147588 ;
	setAttr ".tk[24]" -type "float3" -0.011679985 0.02319162 -0.16180705 ;
	setAttr ".tk[25]" -type "float3" 1.3904201e-09 -0.017069468 0.085371204 ;
	setAttr ".tk[27]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[28]" -type "float3" -0.096310012 0.017633677 -0.080420963 ;
	setAttr ".tk[29]" -type "float3" -0.034388263 0.088382147 -0.14129144 ;
	setAttr ".tk[30]" -type "float3" 0.037095115 -0.04026109 -0.10811942 ;
	setAttr ".tk[31]" -type "float3" 0 0.25618026 0 ;
	setAttr ".tk[32]" -type "float3" -0.01602318 -0.10482258 0.039413482 ;
	setAttr ".tk[33]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[34]" -type "float3" -0.096310012 -0.17675723 -0.080420963 ;
	setAttr ".tk[35]" -type "float3" -0.034388263 0.19056039 -0.14129144 ;
	setAttr ".tk[36]" -type "float3" 0.037095115 -0.04026109 -0.033929154 ;
	setAttr ".tk[37]" -type "float3" 0 0.28092566 0 ;
	setAttr ".tk[39]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[40]" -type "float3" -0.096310012 0.14222147 -0.080420963 ;
	setAttr ".tk[41]" -type "float3" -0.034388263 0.19647354 -0.063705027 ;
	setAttr ".tk[42]" -type "float3" 0.058570176 -0.072473697 0.029523561 ;
	setAttr ".tk[43]" -type "float3" -0.10492495 0.28442383 -0.017267179 ;
	setAttr ".tk[45]" -type "float3" 0 0.37176973 0 ;
	setAttr ".tk[46]" -type "float3" -0.034388263 0.088382155 0.013881368 ;
	setAttr ".tk[47]" -type "float3" -0.034388263 0.010795741 0.013881362 ;
	setAttr ".tk[48]" -type "float3" -0.0092595685 0.0034981754 0.078398116 ;
	setAttr ".tk[49]" -type "float3" -0.10492495 0.0034981754 0.078398116 ;
	setAttr ".tk[50]" -type "float3" -0.10196877 0.024763469 -0.029721279 ;
	setAttr ".tk[51]" -type "float3" 0 0.37176973 0 ;
	setAttr ".tk[53]" -type "float3" -0.13134015 -0.093924895 0.013907236 ;
	setAttr ".tk[54]" -type "float3" -0.033690818 0.024763469 0.0044176597 ;
	setAttr ".tk[55]" -type "float3" -0.067829758 0.024763469 0.0044176597 ;
	setAttr ".tk[56]" -type "float3" -0.10196877 0.024763469 0.0044176597 ;
	setAttr ".tk[57]" -type "float3" 0 0.37176973 0 ;
	setAttr ".tk[58]" -type "float3" -0.031991471 0.39403597 0.012600123 ;
	setAttr ".tk[59]" -type "float3" -0.096951902 -0.18230703 0.11737242 ;
	setAttr ".tk[60]" -type "float3" 0.038862303 0.038120162 0.058069367 ;
	setAttr ".tk[61]" -type "float3" -0.022333665 0.076545551 0.075711735 ;
	setAttr ".tk[62]" -type "float3" -0.10196877 0.024763469 0.03855658 ;
	setAttr ".tk[63]" -type "float3" -0.067829758 0.27489522 -0.046790753 ;
	setAttr ".tk[64]" -type "float3" -0.031991471 -0.12992086 0.077560544 ;
	setAttr ".tk[65]" -type "float3" -0.096951902 -0.12992086 0.077560544 ;
	setAttr ".tk[66]" -type "float3" -0.033690818 0.058902401 0.03855658 ;
	setAttr ".tk[67]" -type "float3" -0.067829758 0.058902401 0.03855658 ;
	setAttr ".tk[68]" -type "float3" -0.10196877 0.058902401 0.03855658 ;
	setAttr ".tk[69]" -type "float3" -0.033501152 -0.070573777 -0.30986285 ;
	setAttr ".tk[70]" -type "float3" -0.031991471 -0.064960428 0.077560544 ;
	setAttr ".tk[71]" -type "float3" -0.096951902 -0.064960428 0.077560544 ;
	setAttr ".tk[72]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".tk[73]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".tk[74]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".tk[75]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".tk[76]" -type "float3" -0.031991471 -4.7488653e-09 0.077560544 ;
	setAttr ".tk[77]" -type "float3" -0.096951902 -4.7488653e-09 0.077560544 ;
	setAttr ".tk[78]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".tk[79]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".tk[80]" -type "float3" -0.033501152 -0.070573777 -0.14599177 ;
	setAttr ".tk[82]" -type "float3" -0.031991471 0.06496042 0.077560544 ;
	setAttr ".tk[83]" -type "float3" -0.096951902 0.06496042 0.077560544 ;
	setAttr ".tk[84]" -type "float3" 0.10762868 0.091413185 0.041285496 ;
	setAttr ".tk[85]" -type "float3" 0.031996828 0.091413185 0.041285496 ;
	setAttr ".tk[88]" -type "float3" -0.026883563 0.09516447 -0.041780114 ;
	setAttr ".tk[89]" -type "float3" -0.08728639 0.32937536 0.12567054 ;
	setAttr ".tk[90]" -type "float3" 0.10762868 0.16704515 0.041285496 ;
	setAttr ".tk[91]" -type "float3" 0.031996828 0.16704515 0.041285496 ;
	setAttr ".tk[94]" -type "float3" -0.026883563 -0.021418631 0.12567054 ;
	setAttr ".tk[95]" -type "float3" -0.16293117 0.1965775 -0.036707304 ;
	setAttr ".tk[96]" -type "float3" 0.10762868 0.16704515 -0.034346431 ;
	setAttr ".tk[97]" -type "float3" 0.031996828 0.16704515 -0.034346431 ;
	setAttr ".tk[99]" -type "float3" 0.033519272 -0.25638655 0.0652676 ;
	setAttr ".tk[100]" -type "float3" -0.026883563 0.1555673 0.0652676 ;
	setAttr ".tk[101]" -type "float3" -0.08728639 0.1555673 0.0652676 ;
	setAttr ".tk[102]" -type "float3" 0.12341458 0.05626452 -0.078938812 ;
	setAttr ".tk[103]" -type "float3" 0.040386852 0.12683834 0.06705296 ;
	setAttr ".tk[105]" -type "float3" 0.060402833 0.030201415 -0.030201413 ;
	setAttr ".tk[106]" -type "float3" -0.026883563 0.1555673 0.0048647886 ;
	setAttr ".tk[107]" -type "float3" -0.08728639 0.1555673 0.0048647886 ;
	setAttr ".tk[108]" -type "float3" 0.15691555 0.12683834 -0.049475875 ;
	setAttr ".tk[109]" -type "float3" 0.040386852 0.12683834 -0.049475875 ;
	setAttr ".tk[110]" -type "float3" 0.089886867 -0.19914629 0.026666105 ;
	setAttr ".tk[111]" -type "float3" 0 0.12273279 0 ;
	setAttr ".tk[112]" -type "float3" 0.030498641 -0.17656311 -0.055538081 ;
	setAttr ".tk[113]" -type "float3" -0.060402829 0.12963988 -0.090604298 ;
	setAttr ".tk[114]" -type "float3" 0.16111228 0.13103507 -0.0095241377 ;
	setAttr ".tk[115]" -type "float3" 0.065767527 0.10145774 -0.039101411 ;
	setAttr ".tk[116]" -type "float3" 4.8464752e-09 0.10145774 -0.039101411 ;
	setAttr ".tk[117]" -type "float3" -0.065767512 0.10145774 -0.039101411 ;
	setAttr ".tk[119]" -type "float3" 0.0079486659 0.045170072 -0.039372016 ;
	setAttr ".tk[120]" -type "float3" -0.08728639 0.09516447 0.0652676 ;
	setAttr ".tk[121]" -type "float3" -0.096951902 0.12992086 -0.052360304 ;
	setAttr ".tk[123]" -type "float3" 0.17120837 0 0 ;
	setAttr ".tk[124]" -type "float3" -0.096951902 0.06496042 0.012600123 ;
	setAttr ".tk[125]" -type "float3" -0.096951902 0.06496042 -0.052360304 ;
	setAttr ".tk[128]" -type "float3" -0.096951902 0 0.012600123 ;
	setAttr ".tk[129]" -type "float3" -0.16026531 0 -0.052360304 ;
	setAttr ".tk[130]" -type "float3" 0.092194259 0 0 ;
	setAttr ".tk[131]" -type "float3" 0.01379323 0.10024706 0.13376367 ;
	setAttr ".tk[132]" -type "float3" -0.096951902 -0.064960428 0.012600123 ;
	setAttr ".tk[133]" -type "float3" -0.096951902 -0.064960428 -0.052360304 ;
	setAttr ".tk[134]" -type "float3" -0.034388263 0.088382147 0.013881368 ;
	setAttr ".tk[135]" -type "float3" -0.034388263 0.088382147 -0.063705027 ;
	setAttr ".tk[136]" -type "float3" 0.004314776 -0.10838974 -0.10817581 ;
	setAttr ".tk[137]" -type "float3" 0.063705198 0.11166219 0.045642763 ;
	setAttr ".tk[138]" -type "float3" 0.063705198 0.11166219 -0.020124633 ;
	setAttr ".tk[139]" -type "float3" 0.16111228 0.006113003 -0.0095241377 ;
	setAttr ".tk[140]" -type "float3" -0.067829758 0.075971879 -0.046790753 ;
	setAttr ".tk[141]" -type "float3" 7.7516306e-05 -0.02280019 0.12962551 ;
	setAttr ".tk[142]" -type "float3" 7.7516306e-05 -0.02280019 0.063858166 ;
	setAttr ".tk[143]" -type "float3" 0.022990191 0.011568995 -0.03627855 ;
	setAttr ".tk[144]" -type "float3" -0.13145739 0.0072770226 0.037192047 ;
	setAttr ".tk[145]" -type "float3" 0.022990191 -0.077111244 0.14108196 ;
	setAttr ".tk[146]" -type "float3" 0.022990191 -0.077111244 0.052401774 ;
	setAttr ".tk[147]" -type "float3" 0.086617842 -0.0084163863 -0.12026131 ;
	setAttr ".tk[148]" -type "float3" -0.033690818 0.058902401 0.0044176597 ;
	setAttr ".tk[149]" -type "float3" -0.033690818 0.058902401 -0.029721279 ;
	setAttr ".tk[150]" -type "float3" -0.033690818 0.058902401 -0.0638602 ;
	setAttr ".tk[151]" -type "float3" -0.0092595685 0.099163517 -0.11293253 ;
createNode polyTriangulate -n "polyTriangulate1";
	rename -uid "591B1DB0-40AB-4775-5731-5A81AE301E5A";
	setAttr ".ics" -type "componentList" 1 "f[0:599]";
select -ne :time1;
	setAttr ".o" 1;
	setAttr ".unw" 1;
select -ne :hardwareRenderingGlobals;
	setAttr ".otfna" -type "stringArray" 22 "NURBS Curves" "NURBS Surfaces" "Polygons" "Subdiv Surface" "Particles" "Particle Instance" "Fluids" "Strokes" "Image Planes" "UI" "Lights" "Cameras" "Locators" "Joints" "IK Handles" "Deformers" "Motion Trails" "Components" "Hair Systems" "Follicles" "Misc. UI" "Ornaments"  ;
	setAttr ".otfva" -type "Int32Array" 22 0 1 1 1 1 1
		 1 1 1 0 0 0 0 0 0 0 0 0
		 0 0 0 0 ;
	setAttr ".fprt" yes;
select -ne :renderPartition;
	setAttr -s 2 ".st";
select -ne :renderGlobalsList1;
select -ne :defaultShaderList1;
	setAttr -s 5 ".s";
select -ne :postProcessList1;
	setAttr -s 2 ".p";
select -ne :defaultRenderingList1;
select -ne :initialShadingGroup;
	setAttr -s 2 ".dsm";
	setAttr ".ro" yes;
select -ne :initialParticleSE;
	setAttr ".ro" yes;
select -ne :defaultRenderGlobals;
	addAttr -ci true -h true -sn "dss" -ln "defaultSurfaceShader" -dt "string";
	setAttr ".ren" -type "string" "arnold";
	setAttr ".dss" -type "string" "lambert1";
select -ne :defaultResolution;
	setAttr ".pa" 1;
select -ne :hardwareRenderGlobals;
	setAttr ".ctrs" 256;
	setAttr ".btrs" 512;
select -ne :ikSystem;
	setAttr -s 4 ".sol";
connectAttr "polyTriangulate1.out" "pCubeShape1.i";
relationship "link" ":lightLinker1" ":initialShadingGroup.message" ":defaultLightSet.message";
relationship "link" ":lightLinker1" ":initialParticleSE.message" ":defaultLightSet.message";
relationship "shadowLink" ":lightLinker1" ":initialShadingGroup.message" ":defaultLightSet.message";
relationship "shadowLink" ":lightLinker1" ":initialParticleSE.message" ":defaultLightSet.message";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "polyTweak1.out" "polySmoothFace1.ip";
connectAttr "polyCube1.out" "polyTweak1.ip";
connectAttr "polySmoothFace1.out" "polyTriangulate1.ip";
connectAttr "defaultRenderLayer.msg" ":defaultRenderingList1.r" -na;
connectAttr "pCubeShape1.iog" ":initialShadingGroup.dsm" -na;
connectAttr "pCubeShape2.iog" ":initialShadingGroup.dsm" -na;
// End of asteroid4.ma
